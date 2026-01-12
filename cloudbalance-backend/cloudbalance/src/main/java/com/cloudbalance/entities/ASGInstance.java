package com.cloudbalance.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ASGInstance {
    private String resourceId;
    private String resourceName;
    private String region;
    private String desiredCapacity;
    private String minSize;
    private String maxSize;
    private String status;
}
