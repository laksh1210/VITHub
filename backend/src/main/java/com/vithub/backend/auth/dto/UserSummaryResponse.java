package com.vithub.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

/**
 * Public-safe user representation returned alongside auth tokens.
 * Never exposes the password or the JPA entity itself.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSummaryResponse {

    private UUID id;
    private String username;
    private String email;
    private String fullName;
    private Set<String> roles;

}
