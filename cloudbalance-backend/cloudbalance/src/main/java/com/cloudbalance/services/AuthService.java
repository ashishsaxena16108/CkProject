package com.cloudbalance.services;

import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.SecurityUser;
import com.cloudbalance.exceptions.InvalidRefreshTokenException;
import com.cloudbalance.exceptions.RefreshTokenExpiredException;
import com.cloudbalance.records.*;
import com.cloudbalance.utils.JwtUtil;
import com.cloudbalance.utils.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;
    private final PasswordEncoder passwordEncoder;
   public UserAuthDTO login(UserCredential userCredential){
       UsernamePasswordAuthenticationToken authenticationToken =
               new UsernamePasswordAuthenticationToken(
                       userCredential.email(),
                       userCredential.password()
               );
           Authentication authentication = authenticationManager.authenticate(authenticationToken);
           if(authentication.isAuthenticated()){
            SecurityUser user = (SecurityUser) authentication.getPrincipal();
            String refreshToken= user.getFirstName()+"refresh"+user.getEmail();
            redisUtil.set(userCredential.email(),refreshToken);
            return new UserAuthDTO(new UserDTO(user.getId(),user.getFirstName(),user.getLastName(),user.getEmail(),user.getRole(), user.getAccounts())
                    ,"Successfully Authenticated"
                    , jwtUtil.generateToken(userCredential.email(), user.getRole()), passwordEncoder.encode(refreshToken));
           }
           else{
               throw new UsernameNotFoundException("Invalid User Request");
           }
   }
   public RefreshTokenDTO refreshToken(RefreshRequestDTO requestDTO){
        String fetchedRefreshToken = redisUtil.get(requestDTO.email());
        if(fetchedRefreshToken==null)
            throw new RefreshTokenExpiredException("Refresh Token expired.Please,login again");
        if(passwordEncoder.matches(fetchedRefreshToken,requestDTO.refreshToken()))
            return new RefreshTokenDTO(jwtUtil.generateToken(requestDTO.email(),requestDTO.role()));
        throw new InvalidRefreshTokenException("Refresh Token is Invalid");
   }
}
