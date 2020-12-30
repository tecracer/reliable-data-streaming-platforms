import { Key } from '@aws-cdk/aws-kms';
import * as cdk from '@aws-cdk/core';
import { Stream, StreamEncryption } from '@aws-cdk/aws-kinesis';

export class ReliableDataStreamingPlatformsKinesisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const amazonKinesisEncryptionKey = new Key(this, 'tRCAmazonKinesisKey', {
      alias: 'tRCAmazonKinesisKey',
      description: 'Amazon Kinesis Encryption Key',
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const amazonKinesisStream = new Stream(this, 'tRCAmazonKinesisStream', {
      encryption: StreamEncryption.KMS,
      encryptionKey: amazonKinesisEncryptionKey,
      retentionPeriod: cdk.Duration.minutes(2),
      shardCount: 2
    });

    new cdk.CfnOutput(this, 'tRCAmazonKinesisStreamArn', {
      value: amazonKinesisStream.streamArn,
      description: 'Amazon Kinesis Stream Arn (Use to obtain Cluster Information)'
    });

  }
}
