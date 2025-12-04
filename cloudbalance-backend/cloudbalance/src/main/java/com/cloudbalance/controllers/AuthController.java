package com.cloudbalance.controllers;

import com.cloudbalance.entities.User;
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
   public ResponseEntity<User> login(@RequestBody UserCredential userCredential){
       User user = authService.login(userCredential);
       if(user==null)
           return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
       return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
   }
}
