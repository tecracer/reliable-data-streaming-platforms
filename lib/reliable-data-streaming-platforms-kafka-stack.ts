import { Peer, Port, SecurityGroup, Vpc } from '@aws-cdk/aws-ec2';
import { Key } from '@aws-cdk/aws-kms';
import { CfnCluster } from '@aws-cdk/aws-msk';
import * as cdk from '@aws-cdk/core';

enum KAFKA_VERSION {
  VER_1_1_1 = '1.1.1',
  VER_2_2_1 = '2.2.1',
  VER_2_7_0 = '2.7.0'
}

export class ReliableDataStreamingPlatformsKafkaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const defaultVpc = Vpc.fromLookup(this, 'tRCRegionDefaultVpc', {
      isDefault: true,
    });

    const subnetIds: string[] = [];

    defaultVpc.publicSubnets.forEach(subnet => {
      subnetIds.push(subnet.subnetId)
    });

    const amazonMskSecurityGroup = new SecurityGroup(this, 'tRCAmazonMskSg', {
      vpc: defaultVpc,
      allowAllOutbound: true,
      description: 'Security Group for Amazon MSK Brokers'
    });

    amazonMskSecurityGroup.addIngressRule(
      Peer.ipv4(defaultVpc.vpcCidrBlock),
      Port.tcp(9092),
      'Allow Access to Kafka Brokers for complete VPC'
    );

    const amazonMskEncryptionKey = new Key(this, 'tRCAmazonMskKey', {
      alias: 'tRCAmazonMskKey',
      description: 'Amazon MSK Encryption Key',
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const amazonMskCluster = new CfnCluster(this, 'tRCAmazonMskCluster', {
      brokerNodeGroupInfo: {
        clientSubnets: subnetIds,
        instanceType: 'kafka.m5.large',
        securityGroups: [
          amazonMskSecurityGroup.securityGroupId
        ],
        storageInfo: {
          ebsStorageInfo: {
            volumeSize: 128
          }
        }
      },
      clusterName: 'tRCAmazonMskTestCluster',
      kafkaVersion: KAFKA_VERSION.VER_2_7_0,
      numberOfBrokerNodes: 3,
      encryptionInfo: {
        encryptionAtRest: {
          dataVolumeKmsKeyId: amazonMskEncryptionKey.keyId
        },
        encryptionInTransit: {
          inCluster: true,
          clientBroker: 'TLS'
        }
      }
    });

    new cdk.CfnOutput(this, 'tRCAmazonMskArn', {
      value: amazonMskCluster.ref,
      description: 'Amazon MSK Cluster ARN (Use to obtain Cluster Information)'
    });

  }
}
