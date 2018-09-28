import express from 'express';
import authenticate from '../middlewares/authenticate';
import request from 'request-promise';
import { parseString } from 'xml2js';
import parseErrors from '../utils/parseError';
import Poll from '../models/Poll';

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res) => {
  Poll.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        question: 1,
        _id: 1,
        choices: {
          _id: 1,
          title: 1,
          count: 1
        },
        totalCount: { $sum: '$choices.count' },
        voted: {
          $in: [
            req.currentUser._id,
            {
              $reduce: {
                input: '$choices.users',
                initialValue: [],
                in: { $concatArrays: ['$$value', '$$this'] }
              }
            }
          ]
        },
        user: { _id: 1, username: 1, email: 1 },
        createdAt: 1
      }
    }
  ])
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
      choices: { $elemMatch: { _id: req.body.choiceId } },
      'choices.users': { $ne: req.currentUser._id }
    },
    {
      $inc: { 'choices.$.count': 1 },
      $push: {
        'choices.$.users': req.currentUser._id
      }
    }
  )
    .then(poll => res.json({ poll }))
    .catch(err => res.status(400).json({ errors: parseErrors(err) }));
});

export default router;
