package com.vithub.backend.auth.service;

import com.vithub.backend.auth.dto.LoginRequest;
import com.vithub.backend.auth.dto.RegisterRequest;
import com.vithub.backend.common.exception.ConflictException;
import com.vithub.backend.common.exception.UnauthorizedException;
import com.vithub.backend.entity.Role;
import com.vithub.backend.entity.User;
import com.vithub.backend.mapper.UserMapper;
import com.vithub.backend.repository.RoleRepository;
import com.vithub.backend.repository.UserRepository;
import com.vithub.backend.security.jwt.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegisterRequest registerRequest;
    private Role studentRole;

    @BeforeEach
    void setUp() {
        registerRequest = RegisterRequest.builder()
                .username("jdoe")
                .email("jdoe@vitbhopal.ac.in")
                .password("SecurePass123")
                .fullName("John Doe")
                .build();

        studentRole = new Role();
        studentRole.setId(UUID.randomUUID());
        studentRole.setName(com.vithub.backend.security.Role.STUDENT);
    }

    @Test
    void register_throwsConflict_whenUsernameAlreadyExists() {
        when(userRepository.existsByUsername("jdoe")).thenReturn(true);

        assertThatThrownBy(() -> authenticationService.register(registerRequest))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("jdoe");

        verify(userRepository).existsByUsername("jdoe");
    }

    @Test
    void register_throwsConflict_whenEmailAlreadyExists() {
        when(userRepository.existsByUsername("jdoe")).thenReturn(false);
        when(userRepository.existsByEmail("jdoe@vitbhopal.ac.in")).thenReturn(true);

        assertThatThrownBy(() -> authenticationService.register(registerRequest))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("jdoe@vitbhopal.ac.in");
    }

    @Test
    void register_succeeds_andAssignsDefaultStudentRole() {
        when(userRepository.existsByUsername("jdoe")).thenReturn(false);
        when(userRepository.existsByEmail("jdoe@vitbhopal.ac.in")).thenReturn(false);
        when(roleRepository.findByName(com.vithub.backend.security.Role.STUDENT))
                .thenReturn(Optional.of(studentRole));
        when(passwordEncoder.encode("SecurePass123")).thenReturn("hashed-password");

        User savedUser = User.builder()
                .id(UUID.randomUUID())
                .username("jdoe")
                .email("jdoe@vitbhopal.ac.in")
                .password("hashed-password")
                .fullName("John Doe")
                .enabled(true)
                .roles(Set.of(studentRole))
                .build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        when(jwtService.generateAccessToken(anyString(), any())).thenReturn("access-token");
        when(jwtService.generateRefreshToken(anyString())).thenReturn("refresh-token");
        when(jwtService.getAccessTokenExpirationMs()).thenReturn(3_600_000L);
        when(userMapper.toSummary(savedUser)).thenReturn(
                com.vithub.backend.auth.dto.UserSummaryResponse.builder()
                        .id(savedUser.getId())
                        .username("jdoe")
                        .email("jdoe@vitbhopal.ac.in")
                        .fullName("John Doe")
                        .roles(Set.of("STUDENT"))
                        .build());

        var response = authenticationService.register(registerRequest);

        assertThat(response.getAccessToken()).isEqualTo("access-token");
        assertThat(response.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(response.getUser().getUsername()).isEqualTo("jdoe");
        assertThat(response.getUser().getRoles()).containsExactly("STUDENT");

        verify(userRepository).save(any(User.class));
    }

    @Test
    void login_throwsUnauthorized_onBadCredentials() {
        LoginRequest loginRequest = LoginRequest.builder()
                .usernameOrEmail("jdoe")
                .password("wrong-password")
                .build();

        doThrow(new BadCredentialsException("Bad credentials"))
                .when(authenticationManager).authenticate(any());

        assertThatThrownBy(() -> authenticationService.login(loginRequest))
                .isInstanceOf(UnauthorizedException.class);
    }

}
