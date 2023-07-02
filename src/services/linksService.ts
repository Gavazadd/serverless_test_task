import shortid from 'shortid';
import {ApiError} from "../error";
import {createLink, getAllLinks, getLink, deleteLink} from "../database/linkQueries";
// import ses from '../ses/ses'
import {v4 as uuidv4} from "uuid";
import {ScanCommandOutput} from "@aws-sdk/client-dynamodb";
import {API_URL} from "../config/config";
import {DeleteCommandOutput} from "@aws-sdk/lib-dynamodb/dist-types/commands";
import {validateRefreshToken} from "./tokenService";
import {JwtPayload} from "jsonwebtoken";

class LinksService {
    async create(origUrl: string, isOneTime:boolean, lifeDays: string, refreshToken:string) {
        const userData = validateRefreshToken(refreshToken);
        if (!userData){
            return new ApiError(`No valid refreshToken.`, 400)
        }
        const payload = userData as JwtPayload;
        const isOrigUrl = await this.isURL(origUrl)
        if (!isOrigUrl){
            return new ApiError('Entered string is not a link or has an incorrect format.', 400)
        }
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + Number(lifeDays));
        const futureDateTimestamp = futureDate.getTime().toString()

        const linkId = uuidv4();
        const uniqueId: string = shortid.generate();
        const shortenedUrl = await createLink(linkId, origUrl, uniqueId, '0', payload.id, isOneTime, futureDateTimestamp)
        return shortenedUrl
    }
    async getAll (refreshToken:string){
        const userData = validateRefreshToken(refreshToken);
        if (!userData){
            return new ApiError(`No valid refreshToken.`, 400)
        }
        const payload = userData as JwtPayload;
        const shortenedUrl:ScanCommandOutput = await getAllLinks()
        let userUrls = []
        if (!shortenedUrl.Items || shortenedUrl.Items.length === 0){
            return new ApiError(`No items in table the "links"`, 400)
        }
        for (let item of shortenedUrl.Items){
            if (item.userId.toString() === payload.id){
                userUrls.push(`${API_URL}`+ item['shortUrl'])
            }
        }
        if (!(userUrls.length > 0)){
            return new ApiError(`User with this ID haven't got any shorted links`, 400)
        }
        return userUrls
    }

    async getUrl(shortUrl:string){
        const urlItem = await getLink(shortUrl)
        if (!urlItem){
            return new ApiError(`This link is not available"`, 400)
        }
        if (urlItem.isOneTime){
            await this.delete(urlItem['shortUrl'])
            return urlItem.origUrl
        }
        const currentDate = new Date().getTime().toString();
        if (urlItem.lifeDays < currentDate){
            await this.delete(urlItem['shortUrl'])
            return new ApiError(`Life period of this link has been expired.`, 400)
        }
        const counter = Number(urlItem['counter']) + 1
        await  createLink(urlItem['linkId'], urlItem['origUrl'],urlItem['shortUrl'], `${counter}`, urlItem['userId'], urlItem['isOneTime'], urlItem['lifeDays'] )
        return urlItem.origUrl
    }

    async delete(shortUrl: string) {
        const deletedLink :DeleteCommandOutput = await deleteLink(shortUrl)
        return deletedLink
    }

    // async deleteTest( to:string, subject:string, message:string) {
    // }

    async isURL(input: string) {
        try {
            const parsedUrl: URL = new URL(input);
            return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }
}

module.exports = new LinksService()