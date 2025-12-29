package com.cloudbalance.records;

import java.util.Map;

public record GroupWiseDTO(String groupName, Map<String,Long> monthlyData, Long totalCost) {
}
