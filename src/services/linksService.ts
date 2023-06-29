import shortid from 'shortid';
import {ApiError} from "../error";
import {createLink, getAllLinks, getLink} from "../database/linkQueries";
import {v4 as uuidv4} from "uuid";
import {ScanCommandOutput} from "@aws-sdk/client-dynamodb";
import {API_URL} from "../config/config";

class LinksService {
    async create(origUrl: string, userId:string) {
        const isOrigUrl = await this.isURL(origUrl)
        if (!isOrigUrl){
            return new ApiError('Entered string is not a link or has an incorrect format.', 400)
        }
        const linkId = uuidv4();
        const uniqueId: string = shortid.generate();
        const shortenedUrl = await createLink(linkId, origUrl, uniqueId, '0', userId)
        return shortenedUrl
    }
    async getAll (userId:string){
        const shortenedUrl:ScanCommandOutput = await getAllLinks()
        let userUrls = []
        if (!shortenedUrl.Items || shortenedUrl.Items.length === 0){
            return new ApiError(`No items in table the "links"`, 400)
        }
        for (let item of shortenedUrl.Items){
            if (item.userId.toString() === userId){
                userUrls.push(`${API_URL}`+ item['shortUrl'])
            }
        }
        if (!(userUrls.length > 0)){
            return new ApiError(`User with this ID haven't got any shorted links`, 400)
        }
        return userUrls
    }

    async getUrl(shortUrl:string){

    }

    async delete(linkId: string) {
        return `${linkId}`
    }

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