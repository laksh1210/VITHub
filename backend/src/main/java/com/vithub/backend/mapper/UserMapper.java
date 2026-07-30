package com.vithub.backend.mapper;

import com.vithub.backend.auth.dto.UserSummaryResponse;
import com.vithub.backend.entity.Role;
import com.vithub.backend.entity.User;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity-to-DTO mapping for {@link User}. Entities must never be returned
 * directly from a controller; this is the single place that decides what
 * of a User is safe to expose.
 */
@Component
public class UserMapper {

    public UserSummaryResponse toSummary(User user) {
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .map(Enum::name)
                .collect(Collectors.toUnmodifiableSet());

        return UserSummaryResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .roles(roleNames)
                .build();
    }

}
