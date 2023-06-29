import dynamodb from "./db";
import {TOKENTABLENAME} from "../config/config";

const createTokens = async (id: string, accessToken: string, refreshToken: string) => {
    await dynamodb.put({
        TableName: TOKENTABLENAME,
        Item: {
            userId: id,
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
    const createdToken = await getTokens(id)
    return createdToken
};

const getTokens = async (id: string) => {
    const { Item } = await dynamodb.get({
        TableName: TOKENTABLENAME,
        Key: {
            "userId": id
        }
    });
    return Item;
};

export { createTokens, getTokens};
