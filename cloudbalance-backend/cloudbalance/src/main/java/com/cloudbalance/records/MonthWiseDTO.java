package com.cloudbalance.records;

import java.util.Map;

public record MonthWiseDTO(Map<String,Long> groupData, Long totalCost) {
}
