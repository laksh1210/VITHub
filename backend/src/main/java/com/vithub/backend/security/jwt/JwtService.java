package com.vithub.backend.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

/**
 * Responsible for issuing and validating JWT access/refresh tokens.
 * Kept self-contained (no DB dependency) so tokens are stateless and
 * verifiable using only the shared signing secret.
 *
 * NOTE: Full authentication wiring (register/login/refresh endpoints,
 * CustomUserDetails, UserDetailsService) is completed in Phase 2.
 */
@Slf4j
@Service
public class JwtService {

    @Value("${vithub.jwt.secret}")
    private String secret;

    @Value("${vithub.jwt.access-token-expiration-ms}")
    private long accessTokenExpirationMs;

    @Value("${vithub.jwt.refresh-token-expiration-ms}")
    private long refreshTokenExpirationMs;

    private SecretKey signingKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public static final String TOKEN_TYPE_CLAIM = "type";
    public static final String TOKEN_TYPE_ACCESS = "access";
    public static final String TOKEN_TYPE_REFRESH = "refresh";

    public String generateAccessToken(String subject, Map<String, Object> claims) {
        Map<String, Object> merged = new java.util.HashMap<>(claims);
        merged.put(TOKEN_TYPE_CLAIM, TOKEN_TYPE_ACCESS);
        return buildToken(subject, merged, accessTokenExpirationMs);
    }

    public String generateRefreshToken(String subject) {
        return buildToken(subject, Map.of(TOKEN_TYPE_CLAIM, TOKEN_TYPE_REFRESH), refreshTokenExpirationMs);
    }

    public String extractTokenType(String token) {
        return extractClaim(token, claims -> claims.get(TOKEN_TYPE_CLAIM, String.class));
    }

    public long getAccessTokenExpirationMs() {
        return accessTokenExpirationMs;
    }

    private String buildToken(String subject, Map<String, Object> claims, long expirationMs) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(signingKey())
                .compact();
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (ExpiredJwtException e) {
            log.debug("JWT expired: {}", e.getMessage());
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("JWT invalid: {}", e.getMessage());
            return false;
        }
    }

}
