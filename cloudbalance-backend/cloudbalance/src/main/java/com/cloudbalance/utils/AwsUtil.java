package com.cloudbalance.utils;


import com.cloudbalance.entities.ASGInstance;
import com.cloudbalance.entities.RDSInstance;
import com.cloudbalance.entities.EC2Instance;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.autoscaling.AutoScalingClient;
import software.amazon.awssdk.services.autoscaling.model.AutoScalingGroup;
import software.amazon.awssdk.services.autoscaling.model.DescribeAutoScalingGroupsResponse;
import software.amazon.awssdk.services.ec2.Ec2Client;
import software.amazon.awssdk.services.ec2.model.DescribeInstancesResponse;
import software.amazon.awssdk.services.ec2.model.Instance;
import software.amazon.awssdk.services.ec2.model.Reservation;
import software.amazon.awssdk.services.ec2.model.Tag;
import software.amazon.awssdk.services.rds.RdsClient;
import software.amazon.awssdk.services.rds.model.DBInstance;
import software.amazon.awssdk.services.rds.model.DescribeDbInstancesResponse;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.AssumeRoleRequest;
import software.amazon.awssdk.services.sts.model.AssumeRoleResponse;

import java.util.ArrayList;
import java.util.List;

@Component
public class AwsUtil {
   public AwsCredentialsProvider assumeRole(String arn,AwsCredentialsProvider credentialsProvider){
       try (StsClient stsClient = StsClient.builder()
               .region(Region.US_EAST_1)
               .credentialsProvider(credentialsProvider)
               .build()) {

           AssumeRoleRequest roleRequest = AssumeRoleRequest.builder()
                   .roleArn(arn)
                   .roleSessionName("AppSessionName")
                   .durationSeconds(3600)
                   .build();

           // 3. Call STS to get the temporary credentials
           AssumeRoleResponse roleResponse = stsClient.assumeRole(roleRequest);

           // 4. Map the response to an AwsCredentialsProvider
           return StaticCredentialsProvider.create(AwsSessionCredentials.create(
                   roleResponse.credentials().accessKeyId(),
                   roleResponse.credentials().secretAccessKey(),
                   roleResponse.credentials().sessionToken()
           ));
       }
   }
    public List<EC2Instance> getEC2Instances(AwsCredentialsProvider credentialsProvider) {

        List<EC2Instance> instancesData = new ArrayList<>();

        // 1️⃣ Get all available regions
        List<Region> regions;
        try (Ec2Client ec2Global = Ec2Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(credentialsProvider)
                .build()) {

            regions = ec2Global.describeRegions().regions().stream()
                    .map(r -> Region.of(r.regionName()))
                    .toList();
        }

        for (Region region : regions) {

            DescribeInstancesResponse response;

            try (Ec2Client ec2 = Ec2Client.builder()
                    .region(region)
                    .credentialsProvider(credentialsProvider)
                    .build()) {

                response = ec2.describeInstances();
            }

            for (Reservation reservation : response.reservations()) {
                for (Instance instance : reservation.instances()) {
                    instancesData.add(new EC2Instance(
                            instance.instanceId(),
                            instance.tags().stream()
                                    .filter(t -> t.key().equals("Name"))
                                    .findFirst()
                                    .map(Tag::value)
                                    .orElse("Untitled"),
                            instance.placement().availabilityZone(),
                            instance.state().nameAsString()
                    ));
                }
            }
        }

        return instancesData;
    }

   public List<RDSInstance> getRDSInstances(AwsCredentialsProvider awsCredentialsProvider){
       List<RDSInstance> dbInstances = new ArrayList<>();
       List<Region> regions;

       try (Ec2Client ec2Global = Ec2Client.builder()
               .region(Region.US_EAST_1)
               .credentialsProvider(awsCredentialsProvider)
               .build()) {

           regions = ec2Global.describeRegions().regions().stream()
                   .map(r -> Region.of(r.regionName()))
                   .toList();
       }
       for(Region region :regions) {
           DescribeDbInstancesResponse response;
           try (RdsClient rds = RdsClient.builder()
                   .region(region)
                   .credentialsProvider(awsCredentialsProvider)
                   .build()) {
               response = rds.describeDBInstances();
           }

           for (DBInstance instance : response.dbInstances()) {
               dbInstances.add(new RDSInstance(instance.dbiResourceId()
                       , instance.dbName()
                       , instance.engine()
                       , instance.availabilityZone(),
                       instance.dbInstanceStatus()));
           }
       }
       return dbInstances;
   }
   public List<ASGInstance> getASGInstances(AwsCredentialsProvider awsCredentialsProvider){
       List<Region> regions;
       List<ASGInstance> asgInstances = new ArrayList<>();
       try (Ec2Client ec2Global = Ec2Client.builder()
               .region(Region.US_EAST_1)
               .credentialsProvider(awsCredentialsProvider)
               .build()) {

           regions = ec2Global.describeRegions().regions().stream()
                   .map(r -> Region.of(r.regionName()))
                   .toList();
       }
       for(Region region :regions) {
           DescribeAutoScalingGroupsResponse response;
           try (AutoScalingClient asg = AutoScalingClient.builder()
                   .region(Region.US_EAST_1)
                   .credentialsProvider(awsCredentialsProvider)
                   .build()) {
               response = asg.describeAutoScalingGroups();
           }
           for (AutoScalingGroup instance : response.autoScalingGroups()) {
               asgInstances.add(new ASGInstance(instance.autoScalingGroupARN()
                       , instance.launchConfigurationName(), instance.availabilityZones().get(0)
                       , instance.desiredCapacity().toString()
                       , instance.minSize().toString()
                       , instance.maxSize().toString()
                       , instance.status()));
           }
       }
       return asgInstances;
   }
}
