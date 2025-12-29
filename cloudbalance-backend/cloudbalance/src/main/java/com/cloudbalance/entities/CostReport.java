package com.cloudbalance.entities;

public record CostReport(
        String groupKey,
        Long totalCost,
        Long month,
        Long year
) {
}
