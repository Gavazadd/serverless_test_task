import { Router } from 'express';
const linksController = require('../../controllers/linksController')

const router : Router = Router();

router.post('/', linksController.create);

router.get('/', linksController.getAll);

router.get('/:url', linksController.getUrl);

router.delete('/:linkId', linksController.delete);

export default router;