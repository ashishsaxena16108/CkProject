package com.cloudbalance.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RDSInstance {
    private String resourceId;
    private String resourceName;
    private String engine;
    private String region;
    private String status;
}
