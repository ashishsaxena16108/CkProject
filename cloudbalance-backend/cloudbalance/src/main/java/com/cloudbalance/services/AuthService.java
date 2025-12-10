package com.cloudbalance.services;

import com.cloudbalance.entities.User;
import com.cloudbalance.records.UserAuthDTO;
import com.cloudbalance.records.UserCredential;
import com.cloudbalance.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
   public UserAuthDTO login(UserCredential userCredential){
       UsernamePasswordAuthenticationToken authenticationToken =
               new UsernamePasswordAuthenticationToken(
                       userCredential.email(),
                       userCredential.password()
               );
       try {
           Authentication authentication = authenticationManager.authenticate(authenticationToken);
           if(authentication.isAuthenticated()){
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            return new UserAuthDTO(user
                    ,"Successfully Authenticated"
                    , jwtUtil.generateToken(userCredential.email(), user.getRole()));
           }
           else{
               throw new UsernameNotFoundException("Invalid User Request");
           }
       } catch (org.springframework.security.core.AuthenticationException e) {
           String message = "Authentication failed: Invalid credentials.";
           if (e instanceof org.springframework.security.authentication.DisabledException) {
               message = "Account is disabled.";
           }
           return new UserAuthDTO(null,message,null);
       }
   }
}
