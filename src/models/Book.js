import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: String, required: true },
    pages: { type: Number, default: false },
    covers: { type: String, default: '' },
    goodreadsId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { timestamp: true }
);

schema.plugin(uniqueValidator, { message: 'this email is already taken' });

export default mongoose.model('books', schema);
