import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-sqs-retry',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:SendMessage',
        Resource: {
          'Fn::GetAtt': ['MainQueue', 'Arn']
        }
      }
    ],
  },
  functions: {
    processQueueMessage: {
      handler: 'src/handlers/processQueueMessage.handler',
      events: [
        {
          sqs: {
            arn: {
              'Fn::GetAtt': ['MainQueue', 'Arn']
            },
            batchSize: 1,
          },
        },
      ],
    },
    enqueueMessage: {
      handler: 'src/handlers/enqueueMessage.handler',
      environment: {
        QUEUE_URL: { 'Ref': 'MainQueue' },
      },
      events: [
        {
          http: {
            method: 'post',
            path: 'enqueue',
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'sharp'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      MainQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          VisibilityTimeout: 7200, // 2 hours
          MessageRetentionPeriod: 28800, // 8 hours
          RedrivePolicy: {
            maxReceiveCount: 3, // Number of retry
            deadLetterTargetArn: {
              'Fn::GetAtt': ['DeadLetterQueue', 'Arn']
            }
          }
        }
      },
      DeadLetterQueue: { //dead letter queue
        Type: 'AWS::SQS::Queue',
        Properties: {
        }
      }
    }
  }
  
};

module.exports = serverlessConfiguration;
