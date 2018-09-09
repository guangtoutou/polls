import express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
  res.status(200).json('hello James');
});

export default router;
