package com.vithub.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * VITHub Backend — AI-Powered Campus Digital Twin.
 * Entry point for the Spring Boot application.
 */
@SpringBootApplication
@EnableScheduling
public class VithubBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(VithubBackendApplication.class, args);
    }

}
