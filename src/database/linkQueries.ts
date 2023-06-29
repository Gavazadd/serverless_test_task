import dynamodb from "./db";
import {LINKTABLENAME} from "../config/config";

const createLink = async (linkId: string,origUrl: string, shorUrl: string, counter:string, userId: string) => {
    await dynamodb.put({
        TableName: LINKTABLENAME,
        Item: {
            linkId:linkId,
            origUrl: origUrl,
            shortUrl: shorUrl,
            counter: counter,
            userId: userId
        }
    });
    const createdLink = await getLink(shorUrl)
    return createdLink
};

const getLink = async (shortUrl: string) => {
    const { Item } = await dynamodb.get({
        TableName: LINKTABLENAME,
        Key: {
            "shortUrl": shortUrl
        }
    });
    return Item;
};

const getAllLinks = async () => {
    const links = await dynamodb.scan({
        TableName: LINKTABLENAME
    })
    return links
}

const updateLink = async (shortUrl: string, counter: string) => {

    const params = {
        TableName: 'myTable',
        Key: {
            shortUrl: shortUrl,
        },
        UpdateExpression: 'set counter = :r',
        ExpressionAttributeValues: {
            ':r': counter,
        },
    };
    const updatedLink = await dynamodb.update(params)
    return updatedLink
}

export { createLink, getLink, getAllLinks,updateLink};