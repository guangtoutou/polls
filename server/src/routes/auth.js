import express from 'express';

import parseErrors from '../utils/parseError';
import { sendConfirmationEmail, sendResetPasswordEmail } from '../mailer';

import User from '../models/User';

const router = express.Router();

router.post('/login', (req, res) => {
  const credentials = req.body;
  User.findOne({ username: credentials.username }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.status(200).json(user.toAuthJSON());
    } else {
      res.status(400).json('invalid credentials');
    }
  });
});

router.post('/signup', (req, res) => {
  const { fullname, username, email, password } = req.body;
  const user = new User({ fullname, username, email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(user => {
      res.status(200).json(user.toAuthJSON());
      sendConfirmationEmail(user);
    })
    .catch(err => res.status(400).json(parseErrors(err)));
});

router.get('/confirm', (req, res) => {
  const token = req.query.token;
  const decoded = jwt.decode(token);
  User.findOne({ username: decoded.username }).then(user => {
    if (user && user.confirmed === false) {
      user.confirmed = true;
      user.save().then(user => {
        res.status(200).json(user.toAuthJSON());
      });
    } else if (user && user.confirmed === true) {
      res.status(400).json(parseErrors('email already confirmed'));
    } else {
      res.status(400).json(parseErrors('invalid credentials'));
    }
  });
});

router.post('/forget_password', (req, res) => {
  const username = req.body.username;
  User.findOne({ username }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.status(200).json(user.toAuthJSON());
    } else {
      res.status(400).json(parseErrors('invalid request'));
    }
  });
});

router.post('/validate_token', (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  });
});

router.post('/reset_password', (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({});
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(req.body.password);
          user.save();
          res.json();
        } else {
          res.status(400).json();
        }
      });
    }
  });
});

export default router;
