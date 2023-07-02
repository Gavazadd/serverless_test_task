import {NextFunction, Request, Response} from "express";
import {ApiError} from "../error";
import {ReqBodyInterface} from "../interfaces/reqBody.interface";
import {LinkBodyInterface} from "../interfaces/linkBodyInterface";
import {sendEmail} from "../ses/ses";
import sqs from "../sqs/sqs";
import sqsService from "../sqs/sqsService";
const {validationResult} = require('express-validator')
const linksService = require('../services/linksService')

class UserAuthController {

    async create(req: ReqBodyInterface<LinkBodyInterface>, res: Response, next: NextFunction) {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json(new ApiError(errors.array()[0].msg, 400))
            }
            const {refreshToken} = req.cookies
            const {url, isOneTime, lifeDays} = req.body
            const userData = await linksService.create(url, isOneTime, lifeDays, refreshToken)
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            const {refreshToken} = req.cookies
            const userData = await linksService.getAll(refreshToken)
            res.json(userData)
        }catch (e) {
            next(e)
        }
    }

    async getUrl(req: Request, res: Response, next: NextFunction) {
        try{
            const {url} = req.params
            const origUrl = await linksService.getUrl(url)
            if (typeof (origUrl) === "object"){
                res.json(origUrl)
            }
            res.redirect(origUrl)
        }catch (e) {
            next(e)
        }
    }


    async delete(req: Request, res: Response, next: NextFunction) {
        try{
            const {shortUrl} = req.params
            const userData = await linksService.delete(shortUrl)
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async deleteTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { to, subject, message } = req.body;

            const params = {
                MessageBody: JSON.stringify({ to, subject, message }),
                QueueUrl: 'https://sqs.us-east-1.amazonaws.com/793279027259/ServerlessTest'
            };

            await sqs.sendMessage(params).promise();
            res.json({ message: 'Email added to the queue' });
        } catch (error) {
            console.error('Error sending message to the queue:', error);
            res.status(500).json({ error });
        }
    }

    async deleteTest2(req: Request, res: Response, next: NextFunction) {
        try{
            const { to, subject, message } = req.body;
            await sendEmail(to, subject, message);
            return res.json({ message: 'Email sent successfully' });
        }catch (e) {
            res.status(500).json({ e });
        }
    }

    async deleteTest3(req: Request, res: Response, next: NextFunction) {
        const result = await sqsService()
        res.json(result)
    }
}

module.exports = new UserAuthController();