import { APIGatewayProxyHandler } from 'aws-lambda';
import { SQS } from 'aws-sdk';

const sqs = new SQS();

export const handler: APIGatewayProxyHandler = async (event) => {
  const queueUrl = process.env.QUEUE_URL;
  const { messageBody } = JSON.parse(event.body);

  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(messageBody),
  };

  try {
    await sqs.sendMessage(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message enqueued successfully' }),
    };
  } catch (error) {
    console.error('Error enqueuing message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error enqueuing the message' }),
    };
  }
};
