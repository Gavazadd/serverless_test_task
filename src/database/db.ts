import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const region = "us-east-1";
 const dynamodb: DynamoDBDocument = DynamoDBDocument.from(new DynamoDB({ region }));

export default dynamodb;

