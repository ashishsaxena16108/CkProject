package com.cloudbalance.controllers;

import com.cloudbalance.entities.SecurityUser;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Secured("ROLE_USER")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    @GetMapping("/reports")
    public ResponseEntity<CostReportDTO> getUserReports(@RequestParam(defaultValue = "service",name = "group_by")String groupBy,@RequestParam(name = "accountIds",required = false) List<String> accountIds, @AuthenticationPrincipal SecurityUser user){
        CostReportDTO response = (accountIds==null || accountIds.isEmpty())?userService.getUserReports(user,groupBy):userService.getReportBySelectedAccount(groupBy,accountIds);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/filters")
    public ResponseEntity<List<String>> getUserFilters(@RequestParam(defaultValue = "service",name="group_by")String groupBy,@RequestParam(name = "accountIds",required = false) List<String> accountIds,@AuthenticationPrincipal SecurityUser user){
        List<String> response = (accountIds==null || accountIds.isEmpty()) ?userService.getFilters(user,groupBy):userService.getFiltersBySelectedAccount(groupBy,accountIds);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/reports")
    public ResponseEntity<CostReportDTO> getUserReports(@RequestParam(defaultValue = "service",name = "group_by")String groupBy,@RequestBody List<String> filters,@RequestParam(name = "accountIds",required = false) List<String> accountIds,@AuthenticationPrincipal SecurityUser user){
        CostReportDTO response = (accountIds==null || accountIds.isEmpty())?userService.getUserFilterReport(user,groupBy,filters):userService.getFilterReportBySelectedAccount(groupBy,filters,accountIds);
        return ResponseEntity.ok(response);
    }
}
