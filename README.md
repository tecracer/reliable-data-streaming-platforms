# Reliable Streaming Data Platform

This is a project for to quickly get started with Amazon MSK and Amazon Kinesis for your Data Streaming workloads. Therefore it contains two CloudFormation Stacks that can be independently deployed based on your needs.

> Note: Once you meat all prerequisites for working with the AWS CDK you can simply deploy these stacks directly. For instructions on AWS CDK refere to the [documentation and installation guide](https://github.com/aws/aws-cdk).

- [Reliable Streaming Data Platform](#reliable-streaming-data-platform)
  - [PreDeployment Steps](#predeployment-steps)
  - [Deploy Amazon MSK CloudFormation Stack](#deploy-amazon-msk-cloudformation-stack)
  - [Deploy Amazon Kinesis CloudFormation Stack](#deploy-amazon-kinesis-cloudformation-stack)

## PreDeployment Steps

To deploy this solution using AWS CDK you first need to locally install all dependent packages usign npm.

```shell
npm install
```

## Deploy Amazon MSK CloudFormation Stack

Quickly deploy Amazon MSK Cluster with the AWS CDK CLI. This will create an InTransit and AtRest encrypted Amazon MSK Cluster with three nodes (m5.large) within the default VPC using all three available subnets, the security group for the broker nodes opens inbound port 9092 (Apache Kafka Standard Port) to the default VPC CIDR Range.

> Note: for convenience we use npx in this guide to provide you with the right version of AWS CDK to deploy this solution. When you have CDK installed globally with a different version this will always work and you wont get version conflicts.

```shell
npx cdk@1.80.0 deploy "tRC-ApacheKafka-Stack" -c ACCOUNT_ID=<input-your-aws-account-id>
```

## Deploy Amazon Kinesis CloudFormation Stack

