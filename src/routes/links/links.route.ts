import { Router } from 'express';
const linksController = require('../../controllers/linksController')

const router = Router();

router.get('/', linksController.getAll);

router.get('/:id', linksController.getById);

router.post('/', linksController.create);

router.delete('/:id', linksController.delete);

export default router;