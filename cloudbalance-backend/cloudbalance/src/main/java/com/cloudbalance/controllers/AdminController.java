package com.cloudbalance.controllers;

import com.cloudbalance.records.*;
import com.cloudbalance.services.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    @Secured({"ROLE_ADMIN","ROLE_READ_ONLY"})
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return new ResponseEntity<>(adminService.getAllUsers(),HttpStatus.ACCEPTED);
    }
    @Secured("ROLE_ADMIN")
    @PostMapping("/add-user")
    public ResponseEntity<AddedUserDTO> addUser(@Valid @RequestBody UserDTO user){
        return new ResponseEntity<>(new AddedUserDTO(adminService.addUser(user),
                user.id()==null?"User Successfully Added":"User Updated Successfully"), HttpStatus.CREATED);
    }
    @Secured({"ROLE_ADMIN","ROLE_READ_ONLY"})
    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllAccounts(){
        return new ResponseEntity<>(adminService.getAllAccounts(),HttpStatus.ACCEPTED);
    }
    @Secured("ROLE_ADMIN")
    @PostMapping("/add-account")
    public ResponseEntity<AddedAccountDTO> addAccount(@Valid @RequestBody AccountDTO accountDTO){
        return new ResponseEntity<>(new AddedAccountDTO(adminService.onboardAccount(accountDTO),"Account Onboarded Successfully")
                ,HttpStatus.CREATED);
    }
    @Secured({"ROLE_ADMIN","ROLE_READ_ONLY"})
    @GetMapping("/reports")
    public ResponseEntity<CostReportDTO> getAllReports(@RequestParam(defaultValue = "service",name = "group_by") String groupBy){
        return ResponseEntity.ok(adminService.getReports(groupBy));
    }
    @Secured({"ROLE_ADMIN","ROLE_READ_ONLY"})
    @GetMapping("/filters")
    public ResponseEntity<List<String>> getFilters(@RequestParam(defaultValue = "service",name = "group_by") String groupBy){
        return ResponseEntity.ok(adminService.getFilters(groupBy));
    }
    @Secured({"ROLE_ADMIN","ROLE_READ_ONLY"})
    @PostMapping("/reports")
    public ResponseEntity<CostReportDTO> getFilterReport(@RequestParam(defaultValue = "service",name="group_by")String groupBy
            ,@RequestBody List<String> filters){
        return ResponseEntity.ok(adminService.getFilterReport(groupBy,filters));
    }
}
