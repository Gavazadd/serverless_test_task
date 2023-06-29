const PORT: string = process.env.PORT || "5000";
const AWS_REGION: string = process.env.AWS_REGION || "us-east-1";
const ACCESS_SECRET: string = process.env.ACCESS_SECRET || "secretAccessWord";
const REFRESH_SECRET: string = process.env.REFRESH_SECRET || "secretRefreshWord";
const USERTABLENAME: string = process.env.USERTABLENAME || "users";
const TOKENTABLENAME: string = process.env.TOKENTABLENAME || "tokens";
const LINKTABLENAME: string = process.env.LINKTABLENAME || "links";

export {
    PORT,
    AWS_REGION,
    ACCESS_SECRET,
    REFRESH_SECRET,
    USERTABLENAME,
    TOKENTABLENAME,
    LINKTABLENAME
};