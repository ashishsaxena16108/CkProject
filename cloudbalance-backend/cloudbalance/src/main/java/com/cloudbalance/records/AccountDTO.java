package com.cloudbalance.records;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record AccountDTO(
        Long id,
        @NotBlank(message = "ARN is required")
        @Pattern(regexp = "^arn:[^:]+:[^:]+:[^:]+:(\\d{12}):.*$")
        String accountArn,
        @NotBlank(message = "Account Id is required")
        String accountId,
        @NotBlank(message = "Account Name is required")
        String accountName) {
}
