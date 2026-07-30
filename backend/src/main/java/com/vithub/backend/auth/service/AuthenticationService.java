package com.vithub.backend.auth.service;

import com.vithub.backend.auth.dto.AuthResponse;
import com.vithub.backend.auth.dto.LoginRequest;
import com.vithub.backend.auth.dto.RefreshTokenRequest;
import com.vithub.backend.auth.dto.RegisterRequest;
import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.UnauthorizedException;
import com.vithub.backend.entity.Role;
import com.vithub.backend.entity.User;
import com.vithub.backend.mapper.UserMapper;
import com.vithub.backend.repository.RoleRepository;
import com.vithub.backend.repository.UserRepository;
import com.vithub.backend.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Business logic for authentication: registration, login and access-token
 * refresh. Controllers stay thin — this is where the actual rules live.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException("Username '" + request.getUsername() + "' is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("An account with email '" + request.getEmail() + "' already exists");
        }

        Role studentRole = roleRepository.findByName(com.vithub.backend.security.Role.STUDENT)
                .orElseThrow(() -> new IllegalStateException(
                        "Default role STUDENT is not seeded. Check the roles seed migration."));

        Set<Role> defaultRoles = new HashSet<>();
        defaultRoles.add(studentRole);

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .enabled(true)
                .roles(defaultRoles)
                .build();

        User savedUser = userRepository.save(user);
        log.info("New user registered: {} (id={})", savedUser.getUsername(), savedUser.getId());

        return buildAuthResponse(savedUser);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsernameOrEmail(), request.getPassword()));
        } catch (AuthenticationException ex) {
            log.debug("Failed login attempt for '{}': {}", request.getUsernameOrEmail(), ex.getMessage());
            throw new UnauthorizedException("Invalid username/email or password");
        } finally {
            // Stateless API — no need to keep anything in the SecurityContext
            // beyond the authentication call itself.
            SecurityContextHolder.clearContext();
        }

        User user = userRepository.findByUsernameOrEmail(request.getUsernameOrEmail(), request.getUsernameOrEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid username/email or password"));

        log.info("User logged in: {} (id={})", user.getUsername(), user.getId());

        return buildAuthResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse refresh(RefreshTokenRequest request) {
        String token = request.getRefreshToken();

        if (!jwtService.isTokenValid(token)
                || !JwtService.TOKEN_TYPE_REFRESH.equals(jwtService.extractTokenType(token))) {
            throw new UnauthorizedException("Refresh token is invalid or expired");
        }

        String username = jwtService.extractSubject(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("Refresh token is invalid or expired"));

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .map(Enum::name)
                .toList();

        Map<String, Object> claims = Map.of(
                "userId", user.getId().toString(),
                "roles", roleNames
        );

        String accessToken = jwtService.generateAccessToken(user.getUsername(), claims);
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getAccessTokenExpirationMs() / 1000)
                .user(userMapper.toSummary(user))
                .build();
    }

}
