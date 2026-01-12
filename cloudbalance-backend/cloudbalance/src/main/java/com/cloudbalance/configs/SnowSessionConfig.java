package com.cloudbalance.configs;

import com.snowflake.snowpark_java.Session;
import com.snowflake.snowpark_java.SessionBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class SnowSessionConfig {
    private final Environment env;

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
        properties.put("WAREHOUSE",env.getProperty("SNOWFLAKE_WAREHOUSE"));
        properties.put("DISABLE_ARROW_RESULT_FORMAT", "true");
        return sessionBuilder.configs(properties).create();
    }

}
