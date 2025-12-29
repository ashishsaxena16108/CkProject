package com.cloudbalance.controllers;

import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Secured("ROLE_USER")
@RequestMapping("/user/{id}")
public class UserController {
    private final UserService userService;
    @GetMapping("/reports")
    public ResponseEntity<CostReportDTO> getUserReports(@RequestParam(defaultValue = "service",name = "group_by")String groupBy, @PathVariable Long id){
        return ResponseEntity.ok(userService.getUserReports(id,groupBy));
    }
}
