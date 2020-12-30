import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ReliableDataStreamingPlatforms from '../lib/reliable-data-streaming-platforms-kafka-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new ReliableDataStreamingPlatforms.ReliableDataStreamingPlatformsKafkaStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(matchTemplate({
    "Resources": {}
  }, MatchStyle.EXACT))
});
