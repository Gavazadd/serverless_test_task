import dynamodb from "./db";
import {LINKTABLENAME} from "../config/config";
import {DeleteCommandOutput} from "@aws-sdk/lib-dynamodb/dist-types/commands";
import {ScanCommandOutput} from "@aws-sdk/client-dynamodb";

const createLink = async (linkId: string,origUrl: string, shorUrl: string, counter:string, userId: string, isOneTime:boolean, lifeDays:string):Promise<Record<string, any>|undefined> => {
    await dynamodb.put({
        TableName: LINKTABLENAME,
        Item: {
            linkId:linkId,
            origUrl: origUrl,
            shortUrl: shorUrl,
            counter: counter,
            userId: userId,
            isOneTime: isOneTime,
            lifeDays: lifeDays,
        }
    });
    const createdLink:Record<string, any>|undefined = await getLink(shorUrl)
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

const getAllLinks = async ():Promise<ScanCommandOutput> => {
    const links: ScanCommandOutput = await dynamodb.scan({
        TableName: LINKTABLENAME
    })
    return links
}

const deleteLink = async (shortUrl: string) => {
    const deletedLink:DeleteCommandOutput = await dynamodb.delete({
        TableName: LINKTABLENAME,
        Key: {
            "shortUrl": shortUrl
        }
    });
    return deletedLink;
};

const deactivateAllExpired = async (date: number):Promise<ScanCommandOutput> => {
    const scanResult: ScanCommandOutput = await dynamodb.scan({
        TableName: LINKTABLENAME,
        FilterExpression: "lifeDays < :lifeDaysValue",
        ExpressionAttributeValues: {":lifeDaysValue": date},
    })
    return scanResult
};

export { createLink, getLink, getAllLinks, deleteLink, deactivateAllExpired};