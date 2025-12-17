package com.cloudbalance.controllers;

import com.cloudbalance.entities.Account;
import com.cloudbalance.entities.User;
import com.cloudbalance.records.AccountDTO;
import com.cloudbalance.records.AddedAccountDTO;
import com.cloudbalance.records.AddedUserDTO;
import com.cloudbalance.records.UserDTO;
import com.cloudbalance.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(adminService.getAllUsers(),HttpStatus.ACCEPTED);
    }
    @PostMapping("/add-user")
    public ResponseEntity<AddedUserDTO> addUser(@RequestBody UserDTO user){
        return new ResponseEntity<>(new AddedUserDTO(adminService.addUser(user),
                user.id()==null?"User Successfully Added":"User Updated Successfully"), HttpStatus.CREATED);
    }
    @GetMapping("/accounts")
    public ResponseEntity<List<Account>> getAllAccounts(){
        return new ResponseEntity<>(adminService.getAllAccounts(),HttpStatus.ACCEPTED);
    }
    @PostMapping("/add-account")
    public ResponseEntity<AddedAccountDTO> addAccount(@RequestBody AccountDTO accountDTO){
        return new ResponseEntity<>(new AddedAccountDTO(adminService.onboardAccount(accountDTO),"Account Onboarded Successfully"),HttpStatus.CREATED);
    }
}
