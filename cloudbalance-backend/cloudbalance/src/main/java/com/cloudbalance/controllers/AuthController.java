package com.cloudbalance.controllers;

import com.cloudbalance.records.UserAuthDTO;
import com.cloudbalance.records.UserCredential;
import com.cloudbalance.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {
   private final AuthService authService;
   @PostMapping("/login")
   public ResponseEntity<UserAuthDTO> login(@RequestBody UserCredential userCredential){
       UserAuthDTO response = authService.login(userCredential);
       if(!response.success())
           return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
       return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
   }
}
