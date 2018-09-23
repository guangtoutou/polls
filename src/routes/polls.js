import express from 'express';
import authenticate from '../middlewares/authenticate';
import request from 'request-promise';
import { parseString } from 'xml2js';
import parseErrors from '../utils/parseError';
import Poll from '../models/Poll';

import mongoose from 'mongoose';

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res) => {
  Poll.find()
    .then(polls => res.json({ polls }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/', (req, res) => {
  Poll.create({ ...req.body, userId: req.currentUser._id })
    .then(poll => res.json({ poll }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/vote', (req, res) => {
  Poll.update(
    {
      _id: req.body.pollId,
      choices: { $elemMatch: { _id: req.body.choiceId } }
    },
    {
      $inc: { 'choices.$.count': 1 },
      $push: {
        'choices.$.votes': { userId: req.currentUser._id, voteAt: new Date() }
      }
    }
  )
    .then(poll => res.json({ poll }))
    .catch(err => res.status(400).json({ errors: parseErrors(err) }));
});

export default router;
