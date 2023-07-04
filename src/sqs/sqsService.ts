import { SQS} from "aws-sdk";
import {Message} from "aws-sdk/clients/sqs";
import {getUserById} from "../database/userQueries";
import {sendEmail} from "../ses/ses";
import {API_URL, QUEUE_LINK} from "../config/config";
import {deleteLink} from "../database/linkQueries";


const sqs = new SQS();

const sqsService = async (expiredLinks: any) => {
    try {
        const queueUrl = QUEUE_LINK;
        for (const expiredLink of expiredLinks) {
            await sqs.sendMessage({
                MessageBody: JSON.stringify(expiredLink),
                QueueUrl: queueUrl
            }).promise();
        }

        const allMessages: Message[] = [];
        let response

        do {
            const receiveParams = {
                QueueUrl: queueUrl,
                MaxNumberOfMessages: 10,
                WaitTimeSeconds: 0
            };
            response = await sqs.receiveMessage(receiveParams).promise();

            if (response.Messages) {
                allMessages.push(...response.Messages);
            }
        } while (response.Messages && response.Messages.length);

        while (allMessages.length >= 10) {
            const expiredLinks: Message[] = allMessages.slice(0, 10);
            const emailPromises: Promise<void>[] = expiredLinks.map(async (message: Message) => {
                if (message.Body && message.ReceiptHandle) {
                    const expLink = JSON.parse(message.Body);
                    const {userId, shortUrl} = expLink;
                    const user = await getUserById(userId)
                    if (user) {
                        await sendEmail(
                            user.email,
                            "Deactivated link",
                            `Your link ${API_URL}/${shortUrl} has been deactivated`
                        );
                    }
                    await deleteLink(shortUrl)
                }
            });

            await Promise.allSettled(emailPromises);

            for (const message of expiredLinks) {
                await sqs.deleteMessage(<SQS.DeleteMessageRequest>{
                    QueueUrl: queueUrl,
                    ReceiptHandle: message.ReceiptHandle
                }).promise();

            }

            allMessages.splice(0, 10);
        }

        return {status: 200, message: "All messages sent successfully"};
    } catch (e) {
        console.log("error", e);
    }
};

export {sqsService};
