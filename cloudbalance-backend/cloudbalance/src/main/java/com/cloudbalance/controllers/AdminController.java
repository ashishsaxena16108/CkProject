package com.cloudbalance.controllers;

import com.cloudbalance.records.*;
import com.cloudbalance.services.AdminService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Validated
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
    public ResponseEntity<CostReportDTO> getAllReports(@RequestParam(defaultValue = "service",name = "group_by") String groupBy,
                                                       @RequestParam(name = "accountIds",required = false)List<
                                                               @Pattern(regexp = "^\\d{12}$", message = "Invalid AWS accountId")String>
                                                               accountIds,
                                                       @RequestParam(name="filters",required = false)List<String> filters,
                                                        @RequestParam(name="start_date",required = false)
                                                           @Pattern(
                                                                   regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
                                                                   message = "Date must be in YYYY-MM-DD format"
                                                           )String startDate,
                                                       @RequestParam(name="end_date",required = false)
                                                           @Pattern(
                                                                   regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
                                                                   message = "Date must be in YYYY-MM-DD format"
                                                           )String endDate){
        return ResponseEntity.ok(adminService.getReports(groupBy,accountIds,filters,startDate,endDate));
    }

    @Secured({"ROLE_ADMIN","ROLE_READ_ONLY"})
    @GetMapping("/filters")
    public ResponseEntity<List<String>> getFilters(@RequestParam(defaultValue = "service",name = "group_by") String groupBy,
                                                   @RequestParam(name = "accountIds",required = false)List<
                                                           @Pattern(regexp = "^\\d{12}$", message = "Invalid AWS accountId")String> accountIds){
        return ResponseEntity.ok(adminService.getFilters(groupBy,accountIds));
    }
    @Secured({"ROLE_ADMIN","ROLE_READ_ONLY"})
    @GetMapping("/resources")
    public ResponseEntity<ResourceDTO> getResources(@RequestParam(name = "accountIds",required = false)List<
            @Pattern(regexp = "^\\d{12}$", message = "Invalid AWS accountId")String> accountIds){
        return ResponseEntity.ok(adminService.getResources(accountIds));
    }
}
