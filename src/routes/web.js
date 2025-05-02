import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('test.ejs', { title: 'Test Page' });
});

export default router;