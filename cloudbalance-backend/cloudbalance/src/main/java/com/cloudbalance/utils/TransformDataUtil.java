package com.cloudbalance.utils;

import com.cloudbalance.entities.CostReport;
import com.cloudbalance.records.CostReportDTO;
import com.cloudbalance.records.GroupWiseDTO;
import com.cloudbalance.records.MonthWiseDTO;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TransformDataUtil {
    private TransformDataUtil(){}
    public static CostReportDTO transformData(List<CostReport> reports){
        GroupWiseDTO[] groupWiseDTO =
                reports.stream()
                        .collect(Collectors.groupingBy(CostReport::groupKey))
                        .entrySet().stream()
                        .map(e -> {

                            List<CostReport> list = e.getValue();

                            Map<String,Long> monthlyData =
                                    list.stream()
                                            .collect(Collectors.groupingBy(CostReport::month,Collectors.groupingBy(CostReport::year))
                                            ).entrySet().stream()
                                            .flatMap(monthEntry->
                                                    monthEntry.getValue().entrySet().stream()
                                                            .map(ye->{
                                                                String key=monthEntry.getKey()+"/"+ye.getKey();
                                                                Long value = ye.getValue().stream()
                                                                        .mapToLong(CostReport::totalCost)
                                                                        .sum();
                                                                return Map.entry(key, value);
                                                            }))
                                            .collect(Collectors.toMap(Map.Entry::getKey,Map.Entry::getValue))
                                    ;

                            Long totalCost =
                                    list.stream()
                                            .mapToLong(CostReport::totalCost)
                                            .sum();

                            return new GroupWiseDTO(
                                    e.getKey(),
                                    monthlyData,
                                    totalCost
                            );
                        })
                        .toArray(GroupWiseDTO[]::new);

        LinkedHashMap<String, MonthWiseDTO> monthWiseDTO =
                reports.stream()
                        .collect(Collectors.groupingBy(
                                CostReport::month,
                                Collectors.groupingBy(CostReport::year)
                        ))
                        .entrySet().stream()
                        .flatMap(monthEntry ->
                                monthEntry.getValue().entrySet().stream()
                                        .map(yearEntry -> {

                                            List<CostReport> list = yearEntry.getValue();
                                            String key = monthEntry.getKey() + "/" + yearEntry.getKey();

                                            Map<String,Long> groupData =
                                                    list.stream()
                                                            .map(cr -> Map.entry(cr.groupKey(), cr.totalCost()))
                                                            .collect(Collectors.toMap(Map.Entry::getKey,Map.Entry::getValue));

                                            Long totalCost =
                                                    list.stream()
                                                            .mapToLong(CostReport::totalCost)
                                                            .sum();

                                            return Map.entry(key, new MonthWiseDTO(groupData, totalCost));
                                        })
                        )
                        .sorted(Comparator.comparing((Map.Entry<String, MonthWiseDTO> e) -> {
                            String[] parts = e.getKey().split("/");
                            int month = Integer.parseInt(parts[0]);
                            int year = Integer.parseInt(parts[1]);
                            return year * 100 + month;
                        }))
                        .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                Map.Entry::getValue,
                                (a, b) -> a,
                                LinkedHashMap::new
                        ));
        return new CostReportDTO(groupWiseDTO, monthWiseDTO);
    }
}
