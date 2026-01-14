package com.cloudbalance.entities;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public enum Field {
    service,instance_type,account_id,usage_type,platform,region,purchase_option,usage_type_group,api_operation,resource,availability_zone,tenancy,legal_entity,billing_entity;

    private static final Set<String> VALUES =
            Arrays.stream(values())
                    .map(Enum::name)
                    .collect(Collectors.toSet());

    public static boolean contains(String value) {
        if (value == null) return false;
        return VALUES.contains(value.trim());
    }
}
