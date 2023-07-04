import { SES } from 'aws-sdk';

const ses: SES = new SES();

async function sendEmail(to: string, subject: string, message: string): Promise<void> {
    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: {
                Text: {
                    Data: message,
                },
            },
        },
        Source: 'gavazadd@gmail.com',
    };

    try {
        await ses.sendEmail(params).promise();
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}

export {sendEmail}
