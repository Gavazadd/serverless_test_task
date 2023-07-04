const PORT: string = process.env.PORT || "5000";
const AWS_REGION: string = process.env.AWS_REGION || "us-east-1";
const ACCESS_SECRET: string = process.env.ACCESS_SECRET || "secretAccessWord";
const REFRESH_SECRET: string = process.env.REFRESH_SECRET || "secretRefreshWord";
const USERTABLENAME: string = process.env.USERTABLENAME || "users";
const TOKENTABLENAME: string = process.env.TOKENTABLENAME || "tokens";
const LINKTABLENAME: string = process.env.LINKTABLENAME || "links";
const API_URL: string = process.env.API_URL || "https://wfwp1wpe3f.execute-api.us-east-1.amazonaws.com/dev/link/";

const QUEUE_LINK: string = process.env.QUEUE_LINK || "https://sqs.us-east-1.amazonaws.com/793279027259/ServerlessTest";
export {
    PORT,
    AWS_REGION,
    ACCESS_SECRET,
    REFRESH_SECRET,
    USERTABLENAME,
    TOKENTABLENAME,
    LINKTABLENAME,
    API_URL,
    QUEUE_LINK
};