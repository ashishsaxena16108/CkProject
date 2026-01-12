package com.cloudbalance.controllers;

import com.cloudbalance.entities.SecurityUser;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.records.ResourceDTO;
import com.cloudbalance.services.UserService;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Secured("ROLE_USER")
@RequestMapping("/user")
@Validated
public class UserController {
    private final UserService userService;
    @GetMapping("/reports")
    public ResponseEntity<CostReportDTO> getUserReports(@RequestParam(defaultValue = "service",name = "group_by")String groupBy,
                                                        @RequestParam(name = "accountIds",required = false) List<
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
                                                            )String endDate,
                                                        @AuthenticationPrincipal SecurityUser user){
        return ResponseEntity.ok(userService.getUserReports(user,groupBy,filters,accountIds,startDate,endDate));
    }
    @GetMapping("/filters")
    public ResponseEntity<List<String>> getUserFilters(@RequestParam(defaultValue = "service",name="group_by")String groupBy,
                                                       @RequestParam(name = "accountIds",required = false)
                                                       List<
                                                               @Pattern(regexp = "^\\d{12}$", message = "Invalid AWS accountId")
                                                                       String> accountIds,
                                                       @AuthenticationPrincipal SecurityUser user){
        return ResponseEntity.ok(userService.getFilters(user,groupBy,accountIds));
    }
    @GetMapping("/resources")
    public ResponseEntity<ResourceDTO> getResources(@RequestParam(name = "accountIds",required = false)List<
            @Pattern(regexp = "^\\d{12}$", message = "Invalid AWS accountId")String> accountIds,@AuthenticationPrincipal SecurityUser user){
        return ResponseEntity.ok(userService.getResources(accountIds,user));
    }
}
