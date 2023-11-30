# Serverless SQS Messaging System

## Description

The Serverless SQS Messaging System is a robust and scalable backend solution built with Node.js and TypeScript, utilizing AWS Simple Queue Service (SQS) for message queuing. It's designed to handle asynchronous processes in distributed applications, with features including message retry mechanisms and a dead letter queue for unprocessed messages.

## Features

- **Message Queueing with AWS SQS**: Leverages AWS SQS for efficient message queueing and handling.
- **Retry Mechanism**: Configured to retry message processing every 2 hours in case of failure.
- **Dead Letter Queue**: Integration of a dead letter queue for messages that fail to process after 3 retries.
- **Asynchronous Processing**: Ideal for handling asynchronous tasks in distributed systems.
- **Scalable and Flexible**: Easily adaptable for various use cases requiring message queueing.

## Installation

Before starting, make sure you have Node.js, npm, and the Serverless Framework installed. Also, configure your AWS CLI with appropriate AWS credentials.

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/serverless-sqs-retry.git

2. **Navigate to the Project Directory**:
   ```bash
   cd serverless-sqs-retry

3. **Install dependencies**:
   ```bash
   npm install

## Deployment
Deploy the service using the Serverless Framework. Ensure your AWS credentials are correctly set up.

   ```bash
   serverless deploy   
   ```

## Usage
**Enqueue a Message**
- Endpoint: POST /enqueue
- Payload:
   ```
   {
   "messageBody": "Your message here"
   }
   ```

- Use this endpoint to send a message to the SQS queue.

**Process Queue Messages**
- Messages in the queue are automatically processed by the processQueueMessage Lambda function.
- Failed messages are retried every 2 hours, up to 3 retries.
- Messages that exceed retry attempts are moved to the dead letter queue.   

