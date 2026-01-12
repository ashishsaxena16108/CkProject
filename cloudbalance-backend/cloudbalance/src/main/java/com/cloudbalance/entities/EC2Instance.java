package com.cloudbalance.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EC2Instance {
    private String resourceId;
    private String resourceName;
    private String region;
    private String status;
}
