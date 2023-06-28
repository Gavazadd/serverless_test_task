import * as AWS from "aws-sdk";

AWS.config.update({
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export {dynamodb};