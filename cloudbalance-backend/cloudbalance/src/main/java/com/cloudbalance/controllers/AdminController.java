package com.cloudbalance.controllers;

import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.cloudbalance.records.UserDTO;
import com.cloudbalance.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(adminService.getAllUsers(),HttpStatus.ACCEPTED);
    }
    @PostMapping("/add-user")
    public ResponseEntity<User> addUser(@RequestBody UserDTO user){
        return new ResponseEntity<>(adminService.addUser(user),HttpStatus.CREATED);
    }
    @GetMapping("/accounts")
    public ResponseEntity<List<Account>> getAllAccounts(){
        return new ResponseEntity<>(adminService.getAllAccounts(),HttpStatus.ACCEPTED);
    }

}
