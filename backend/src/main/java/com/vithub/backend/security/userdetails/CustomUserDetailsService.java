package com.vithub.backend.security.userdetails;

import com.vithub.backend.entity.User;
import com.vithub.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Loads a {@link User} by username or email and adapts it into a
 * {@link CustomUserDetails} for Spring Security's {@code DaoAuthenticationProvider}.
 * Login accepts either identifier, so both are tried here.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with username/email: " + usernameOrEmail));
        return new CustomUserDetails(user);
    }

}
