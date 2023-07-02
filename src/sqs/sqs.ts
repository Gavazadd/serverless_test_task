const AWS = require('aws-sdk');
import {AWS_REGION} from "../config/config";

const sqs = new AWS.SQS({
    region: AWS_REGION
});

export default sqs