import dynamodb from "./db";

const tableName: string = "tokens";

const createTokens = async (id: string, accessToken: string, refreshToken: string) => {
    await dynamodb.put({
        TableName: tableName,
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
        TableName: tableName,
        Key: {
            "userId": id
        }
    });
    return Item;
};

export { createTokens, getTokens};
