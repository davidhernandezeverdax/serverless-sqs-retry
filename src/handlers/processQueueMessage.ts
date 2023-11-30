import { SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event) => {
  const processingErrors = [];

  // Iterate over each message in the queue
  for (const record of event.Records) {
    try {
      // Process each message
      console.log('Processing message:', record.body);

      // If the processing is successful, the message will be automatically removed from the queue
    } catch (error) {
      console.error(`Error processing message: ${record.messageId}`, error);
      processingErrors.push(new Error(`Error processing message: ${record.messageId}`));
      // If there is an error, the message will not be removed from the queue and will be retried based on the SQS queue configuration
    }
  }
  if (processingErrors.length > 0) {
    // Throws an error to indicate a processing failure
    throw new Error('Errors encountered while processing messages');
  }
};
