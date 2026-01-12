package com.cloudbalance.utils;

import com.cloudbalance.entities.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Component
public class JwtUtil{
    @Value("${jwt.secret}")
    private String secret;
    @Value(("${jwt.duration}"))
    private Long duration;
    public String generateToken(String username, User.Role role){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role",role.name());
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+duration))
                .signWith(signKey(),Jwts.SIG.HS256)
                .compact();
    }
    public SecretKey signKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(signKey())
                .build().parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        final String role = extractClaim(token,claims->claims.get("role",String.class));
        boolean isRoleValid = userDetails.getAuthorities().stream()
                .anyMatch(a->a.getAuthority()
                        .equals("ROLE_"+role));
        return (username.equals(userDetails.getUsername()) && isRoleValid && !isTokenExpired(token));
    }
}
