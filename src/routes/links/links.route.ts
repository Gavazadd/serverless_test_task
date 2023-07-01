import { Router } from 'express';
import {body, } from "express-validator";
const linksController = require('../../controllers/linksController')

const router : Router = Router();

router.post('/',
    body('url').isURL().notEmpty().withMessage('Type valid URL.'),
    body('isOneTime').notEmpty().isBoolean().withMessage('isOneTime must be boolean.'),
    body('lifeDays').notEmpty().withMessage('LifeDays can`t be empty.'),
    linksController.create);

router.get('/', linksController.getAll);

router.get('/:url', linksController.getUrl);

router.delete('/:shortUrl', linksController.delete);

router.delete('/', linksController.deleteTest);

export default router;