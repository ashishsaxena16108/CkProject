package com.cloudbalance.records;

import java.util.LinkedHashMap;
import java.util.Map;

public record CostReportDTO(GroupWiseDTO[] groupWise, LinkedHashMap<String, MonthWiseDTO> monthWise) {
}
