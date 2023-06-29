import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import {AWS_REGION} from "../config/config";

 const dynamodb: DynamoDBDocument = DynamoDBDocument.from(new DynamoDB({ region: AWS_REGION }));

export default dynamodb;

