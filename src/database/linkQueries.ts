import dynamodb from "./db";
import {LINKTABLENAME} from "../config/config";
import {QueryCommandOutput} from "@aws-sdk/lib-dynamodb";

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


export { createLink, getLink, getAllLinks};