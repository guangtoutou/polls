import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import dotenv from 'dotenv';

import api from './api';

import auth from './routes/auth';
import books from './routes/books';
import polls from './routes/polls';

dotenv.config();
const app = express();
var port = process.env.PORT || 8080;

app.use(cors());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false
  })
);

app.use('/books', books);
app.use('/polls', polls);
app.use('/', auth);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', api);

app.listen(port, () => console.log('running on localhost:8080'));
