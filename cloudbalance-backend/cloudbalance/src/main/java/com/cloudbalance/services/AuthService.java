package com.cloudbalance.services;

import com.cloudbalance.records.UserAuthDTO;
import com.cloudbalance.records.UserCredential;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
   public UserAuthDTO login(UserCredential userCredential){
       UsernamePasswordAuthenticationToken authenticationToken =
               new UsernamePasswordAuthenticationToken(
                       userCredential.email(),
                       userCredential.password()
               );
       try {
           Authentication authentication = authenticationManager.authenticate(authenticationToken);
           SecurityContextHolder.getContext().setAuthentication(authentication);
           return new UserAuthDTO(authentication.getPrincipal(),"Successfully Authenticated",true);
       } catch (org.springframework.security.core.AuthenticationException e) {
           String message = "Authentication failed: Invalid credentials.";
           if (e instanceof org.springframework.security.authentication.DisabledException) {
               message = "Account is disabled.";
           }
           return new UserAuthDTO(null,message,false);
       }
   }
}
