package com.cloudbalance.utils;

import com.cloudbalance.entities.CostReport;
import com.cloudbalance.records.*;
import com.snowflake.snowpark_java.Row;
import com.snowflake.snowpark_java.Session;
import com.snowflake.snowpark_java.SessionBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.*;

@Configuration
@RequiredArgsConstructor
public class SnowUtil {
    private final Environment env;
    private static final String TOTAL_COST="total_cost";
    private static final String BILL_MONTH="bill_month";
    private static final String BILL_YEAR="bill_year";

    @Bean(destroyMethod = "close")
    public Session createSession() {
        SessionBuilder sessionBuilder = Session.builder();
        Map<String, String> properties = new HashMap<>();
        properties.put("URL", env.getProperty("SNOWFLAKE_URL"));
        properties.put("USER", env.getProperty("SNOWFLAKE_NAME"));
        properties.put("DB", env.getProperty("SNOWFLAKE_DB"));
        properties.put("ROLE", env.getProperty("SNOWFLAKE_ROLE"));
        properties.put("PASSWORD", env.getProperty("SNOWFLAKE_PASSWORD"));
        properties.put("SCHEMA", env.getProperty("SNOWFLAKE_SCHEMA"));
        properties.put("DISABLE_ARROW_RESULT_FORMAT", "true");
        return sessionBuilder.configs(properties).create();
    }

    public CostReportDTO getDataByGroup(Session session, String groupBy) {
        Row[] rows = session.sql(String.format(
                """
                        SELECT %s,YEAR(bill_date)  AS bill_year,MONTH(bill_date) AS bill_month,SUM(cost) 
                        AS total_cost FROM costreport GROUP BY %s,
                        YEAR(bill_date),MONTH(bill_date) ORDER BY %s,bill_year,bill_month
                        """, groupBy, groupBy, groupBy)).collect();
        List<CostReport> reports = new ArrayList<>();
        for (Row row : rows) {
            CostReport costReport = new CostReport(row.getAs(groupBy, String.class),
                    row.getAs(TOTAL_COST, Long.class), row.getAs(BILL_MONTH, Long.class),
                    row.getAs(BILL_YEAR, Long.class));
            reports.add(costReport);
        }
        
        return TransformDataUtil.transformData(reports);
    }
    public CostReportDTO getUserDataByGroup(Session session, String groupBy,List<String> accountIds) {
        Row[] rows = session.sql(String.format(
                """
                        SELECT %s,YEAR(bill_date)  AS bill_year,MONTH(bill_date) AS bill_month,SUM(cost)
                        AS total_cost FROM costreport where account_id in (%s) GROUP BY %s,
                        YEAR(bill_date),MONTH(bill_date) ORDER BY %s,bill_year,bill_month
                       """, groupBy, String.join(",", accountIds), groupBy, groupBy)).collect();
        List<CostReport> reports = new ArrayList<>();
        for (Row row : rows) {
            CostReport costReport = new CostReport(row.getAs(groupBy, String.class),
                    row.getAs(TOTAL_COST, Long.class), row.getAs(BILL_MONTH, Long.class),
                    row.getAs(BILL_YEAR, Long.class));
            reports.add(costReport);
        }
        
        return TransformDataUtil.transformData(reports);
    }
    public List<String> getFiltersByGroup(Session session,String groupBy){
        Row[] rows = session.sql(String.format("Select %s from costreport group by %s",groupBy,groupBy)).collect();
        List<String> values = new ArrayList<>();
        for(Row row : rows){
            values.add(row.getAs(groupBy,String.class));
        }
        
        return values;
    }
    public List<String> getFiltersByGroup(Session session,String groupBy,List<String> accountIds){
        Row[] rows = session.sql(String.format("Select %s from costreport where account_id in (%s) group by %s"
                ,groupBy,String.join(",",accountIds),groupBy)).collect();
        List<String> values = new ArrayList<>();
        for(Row row : rows){
            values.add(row.getAs(groupBy,String.class));
        }
        
        return values;
    }
    public CostReportDTO getFilterDataByGroup(Session session, String groupBy,List<String> groupByValues) {
        Row[] rows = session.sql(String.format(
                """
                        SELECT %s,YEAR(bill_date)  AS bill_year,MONTH(bill_date) AS bill_month,SUM(cost) 
                        AS total_cost FROM costreport   WHERE %s in (%s) GROUP BY %s,
                        YEAR(bill_date),MONTH(bill_date) ORDER BY %s,bill_year,bill_month
                        """, groupBy,groupBy,"'"+String.join("','",groupByValues)+"'",groupBy, groupBy)).collect();
        List<CostReport> reports = new ArrayList<>();
        for (Row row : rows) {
            CostReport costReport = new CostReport(row.getAs(groupBy, String.class),
                    row.getAs(TOTAL_COST, Long.class), row.getAs(BILL_MONTH, Long.class),
                    row.getAs(BILL_YEAR, Long.class));
            reports.add(costReport);
        }
        
        return TransformDataUtil.transformData(reports);
    }
    public CostReportDTO getFilterUserDataByGroup(Session session, String groupBy,List<String> accountIds,List<String> groupByValues) {
        Row[] rows = session.sql(String.format(
                """
                SELECT %s,YEAR(bill_date)  AS bill_year,MONTH(bill_date) AS bill_month,SUM(cost) 
                        AS total_cost FROM costreport   WHERE %s in (%s) AND account_id in (%s) GROUP BY %s,
                        YEAR(bill_date),MONTH(bill_date) ORDER BY %s,bill_year,bill_month
                        """, groupBy,groupBy,"'"+String.join("','",groupByValues)+"'",String.join(",",accountIds),groupBy, groupBy)).collect();
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
