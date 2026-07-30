package com.vithub.backend.repository;

import com.vithub.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {

    Optional<Role> findByName(com.vithub.backend.security.Role name);

    boolean existsByName(com.vithub.backend.security.Role name);

}
