import express from 'express';
import { getTrackList } from '../controller/apiController.js';

const router = express.Router();

router.get('/get-tracks', getTrackList);

export default router;