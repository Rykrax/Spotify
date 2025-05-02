import express from 'express';
import { getHomepage } from '../controller/homeController.js';

const router = express.Router();

router.get('/', getHomepage);

export default router;