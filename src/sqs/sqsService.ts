import {sendEmail} from "../ses/ses";
const AWS = require('aws-sdk');
import {AWS_REGION} from "../config/config";

const sqs = new AWS.SQS({
    region: AWS_REGION
});

async function sqsService (){
    const queueUrl = 'https://sqs.us-east-1.amazonaws.com/793279027259/ServerlessTest';
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 0,
    };
        const allMessages = [];

        let response;
        do {
            response = await sqs.receiveMessage(params).promise();

            if (response.Messages) {
                allMessages.push(...response.Messages);
            }
        } while (response.Messages && response.Messages.length > 0);
        if (allMessages.length >= 10) {
            const messages = allMessages.slice(0, 10);
            const emailPromises = messages.map(async (Onemessage: any) => {

                const {to, subject, message} = JSON.parse(Onemessage.Body);

                await sendEmail(to, subject, message);

                await sqs.deleteMessage({
                    QueueUrl: queueUrl,
                    ReceiptHandle: Onemessage.ReceiptHandle,
                }).promise()
            })
            await Promise.all(emailPromises);

            return { message: 'All messages processed successfully' }
        } else {
            return { message: 'Not enough messages in the queue' }
        }
}

export default sqsService