package com.vithub.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Enables JPA auditing so entities extending the common auditable base
 * automatically populate createdAt / updatedAt (and createdBy / updatedBy
 * once security context propagation is wired in Phase 2).
 */
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
}
