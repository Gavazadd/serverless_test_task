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