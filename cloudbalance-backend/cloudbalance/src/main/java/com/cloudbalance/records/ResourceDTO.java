package com.cloudbalance.records;

import com.cloudbalance.entities.ASGInstance;
import com.cloudbalance.entities.EC2Instance;
import com.cloudbalance.entities.RDSInstance;

import java.util.List;

public record ResourceDTO(List<EC2Instance> ec2Instances,
                          List<RDSInstance> rdsInstances,
                          List<ASGInstance> asgInstances) {
}
