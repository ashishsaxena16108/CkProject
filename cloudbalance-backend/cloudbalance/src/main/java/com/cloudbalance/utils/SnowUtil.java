package com.cloudbalance.utils;

import com.cloudbalance.entities.CostReport;
import com.cloudbalance.records.*;
import com.snowflake.snowpark_java.Row;
import com.snowflake.snowpark_java.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.util.*;

@Configuration
@RequiredArgsConstructor
public class SnowUtil {

    private static final String TOTAL_COST="total_cost";
    private static final String BILL_MONTH="bill_month";
    private static final String BILL_YEAR="bill_year";
    private final Session session;

    public List<String> getFiltersByGroup(String groupBy){
        Row[] rows = session.sql(String.format("Select %s from costreport group by %s",groupBy,groupBy)).collect();
        List<String> values = new ArrayList<>();
        for(Row row : rows){
            values.add(row.getAs(groupBy,String.class));
        }
        
        return values;
    }
    public List<String> getFiltersByGroup(String groupBy,List<String> accountIds){
        Row[] rows = session.sql(String.format("Select %s from costreport where account_id in (%s) group by %s"
                ,groupBy,String.join(",",accountIds),groupBy)).collect();
        List<String> values = new ArrayList<>();
        for(Row row : rows){
            values.add(row.getAs(groupBy,String.class));
        }
        
        return values;
    }


    public CostReportDTO getFilterDataByGroup(String groupBy, List<String> accountIds, List<String> groupByValues,String startDate,String endDate) {
        Row[] rows = session.sql(String.format(
                """
                SELECT %s,YEAR(bill_date)  AS bill_year,MONTH(bill_date) AS bill_month,SUM(cost) 
                        AS total_cost FROM costreport   WHERE %s in ('%s') AND account_id in (%s) AND bill_date >= COALESCE(%s, '1900-01-01'::DATE)
                          AND bill_date <= COALESCE(%s, CURRENT_DATE()) GROUP BY %s,
                        YEAR(bill_date),MONTH(bill_date) ORDER BY %s,bill_year,bill_month
                        """, groupBy,groupBy,String.join("','",groupByValues),String.join(",",accountIds),startDate==null? null :"'"+startDate+"'", endDate==null?null:"'"+endDate+"'",groupBy, groupBy)).collect();
        List<CostReport> reports = new ArrayList<>();
        for (Row row : rows) {
            CostReport costReport = new CostReport(row.getAs(groupBy, String.class),
                    row.getAs(TOTAL_COST, Long.class), row.getAs(BILL_MONTH, Long.class),
                    row.getAs(BILL_YEAR, Long.class));
            reports.add(costReport);
        }

        return TransformDataUtil.transformData(reports);
    }
    public CostReportDTO getFilterDataByGroup(String groupBy,List<String> groupByValues,String startDate,String endDate) {
        Row[] rows = session.sql(String.format(
                """
                        SELECT %s,YEAR(bill_date)  AS bill_year,MONTH(bill_date) AS bill_month,SUM(cost) 
                        AS total_cost FROM costreport   WHERE %s in ('%s') AND bill_date >= COALESCE(%s, '1900-01-01'::DATE)
                          AND bill_date <= COALESCE(%s, CURRENT_DATE()) GROUP BY %s,
                        YEAR(bill_date),MONTH(bill_date) ORDER BY %s,bill_year,bill_month
                        """, groupBy,groupBy,String.join("','",groupByValues),startDate==null? null :"'"+startDate+"'", endDate==null?null:"'"+endDate+"'",groupBy, groupBy)).collect();
        List<CostReport> reports = new ArrayList<>();
        for (Row row : rows) {
            CostReport costReport = new CostReport(row.getAs(groupBy, String.class),
                    row.getAs(TOTAL_COST, Long.class), row.getAs(BILL_MONTH, Long.class),
                    row.getAs(BILL_YEAR, Long.class));
            reports.add(costReport);
        }

        return TransformDataUtil.transformData(reports);
    }
    public CostReportDTO getDataByGroup(String groupBy, List<String> accountIds,String startDate,String endDate) {
        Row[] rows = session.sql(String.format(
                """
                        SELECT %s,YEAR(bill_date)  AS bill_year,MONTH(bill_date) AS bill_month,SUM(cost)
                        AS total_cost FROM costreport where account_id in (%s) AND bill_date >= COALESCE(%s, '1900-01-01'::DATE)
                          AND bill_date <= COALESCE(%s, CURRENT_DATE()) GROUP BY %s,
                        YEAR(bill_date),MONTH(bill_date) ORDER BY %s,bill_year,bill_month
                       """, groupBy, String.join(",", accountIds), startDate==null? null :"'"+startDate+"'", endDate==null?null:"'"+endDate+"'", groupBy, groupBy)).collect();
        List<CostReport> reports = new ArrayList<>();
        for (Row row : rows) {
            CostReport costReport = new CostReport(row.getAs(groupBy, String.class),
                    row.getAs(TOTAL_COST, Long.class), row.getAs(BILL_MONTH, Long.class),
                    row.getAs(BILL_YEAR, Long.class));
            reports.add(costReport);
        }

        return TransformDataUtil.transformData(reports);
    }
    public CostReportDTO getDataByGroup(String groupBy,String startDate,String endDate) {
        Row[] rows = session.sql(String.format(
                """
                        SELECT
                            %s,
                            YEAR(bill_date)  AS bill_year,
                            MONTH(bill_date) AS bill_month,
                            SUM(cost) AS total_cost
                        FROM costreport
                        WHERE bill_date >= COALESCE(%s, '1900-01-01'::DATE)
                          AND bill_date <= COALESCE(%s, CURRENT_DATE())
                        GROUP BY %s, YEAR(bill_date), MONTH(bill_date)
                        ORDER BY %s, bill_year, bill_month;
                        """, groupBy, startDate==null? null :"'"+startDate+"'", endDate==null?null:"'"+endDate+"'", groupBy, groupBy)).collect();
        List<CostReport> reports = new ArrayList<>();
        for (Row row : rows) {
            CostReport costReport = new CostReport(row.getAs(groupBy, String.class),
                    row.getAs(TOTAL_COST, Long.class), row.getAs(BILL_MONTH, Long.class),
                    row.getAs(BILL_YEAR, Long.class));
            reports.add(costReport);
        }

        return TransformDataUtil.transformData(reports);
    }
}
