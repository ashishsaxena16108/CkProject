package com.cloudbalance.controllers;

import com.cloudbalance.records.RefreshRequestDTO;
import com.cloudbalance.records.UserAuthDTO;
import com.cloudbalance.records.UserCredential;
import com.cloudbalance.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
   private final AuthService authService;
   @PostMapping("/login")
   public ResponseEntity<UserAuthDTO> login(@RequestBody UserCredential userCredential){
       return new ResponseEntity<>(authService.login(userCredential),HttpStatus.ACCEPTED);
   }
   @PostMapping("/refresh-token")
    public ResponseEntity<Object> refreshToken(@RequestBody RefreshRequestDTO requestDTO){
       return new ResponseEntity<>(authService.refreshToken(requestDTO),HttpStatus.OK);
   }
}
