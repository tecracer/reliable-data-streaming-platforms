#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ReliableDataStreamingPlatformsKafkaStack } from '../lib/reliable-data-streaming-platforms-kafka-stack';
import { ReliableDataStreamingPlatformsKinesisStack } from '../lib/reliable-data-streaming-platforms-kinesis-stack';

const app = new cdk.App();

new ReliableDataStreamingPlatformsKafkaStack(app, 'tRC-ApacheKafka-Stack', {
    description: 'v1.0 - tecRacer - Amazon MSK Platform',
    env: {
        account: app.node.tryGetContext('ACCOUNT_ID'),
        region: 'eu-central-1'
    },
    tags: {
        'Purpose': 'Apache Kafka',
        'Creator': 'Marco Tesch @ tecRacer',
        'Creator-Mail': 'mtesch@tecracer.at',
    }
});

new ReliableDataStreamingPlatformsKinesisStack(app, 'tRC-AmazonKinesis-Stack', {
    description: 'v1.0 - tecRacer - Amazon Kinesis Platform',
    env: {
        account: app.node.tryGetContext('ACCOUNT_ID'),
        region: 'eu-central-1'
    },
    tags: {
        'Purpose': 'Amazon Kinesis',
        'Creator': 'Marco Tesch @ tecRacer',
        'Creator-Mail': 'mtesch@tecracer.at',
    }
});
