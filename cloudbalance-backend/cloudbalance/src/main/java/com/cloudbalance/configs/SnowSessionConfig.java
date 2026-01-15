package com.cloudbalance.configs;

import com.snowflake.snowpark_java.Session;
import com.snowflake.snowpark_java.SessionBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class SnowSessionConfig {
    @Value("${snowflake.url}")
    private String snowflakeUrl;
    @Value("${snowflake.name}")
    private String snowflakeName;
    @Value("${snowflake.db}")
    private String snowflakeDb;
    @Value("${snowflake.role}")
    private String snowflakeRole;
    @Value("${snowflake.password}")
    private String snowflakePassword;
    @Value("${snowflake.schema}")
    private String snowflakeSchema;
    @Value("${snowflake.warehouse}")
    private String snowflakeWarehouse;

    @Bean(destroyMethod = "close")
    public Session createSession() {
        SessionBuilder sessionBuilder = Session.builder();
        Map<String, String> properties = new HashMap<>();
        properties.put("URL", snowflakeUrl);
        properties.put("USER", snowflakeName);
        properties.put("DB", snowflakeDb);
        properties.put("ROLE", snowflakeRole);
        properties.put("PASSWORD", snowflakePassword);
        properties.put("SCHEMA", snowflakeSchema);
        properties.put("WAREHOUSE",snowflakeWarehouse);
        properties.put("DISABLE_ARROW_RESULT_FORMAT", "true");
        return sessionBuilder.configs(properties).create();
    }

}
