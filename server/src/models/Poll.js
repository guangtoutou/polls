import mongoose from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
  {
    question: { type: String },
    choices: [
      {
        title: String,
        count: { type: Number, default: 0 },
        users: [{ type: mongoose.Schema.Types.ObjectId }]
      }
    ],
    expired: { type: Boolean, default: false },
    expiredAt: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { timestamp: true }
);

export default mongoose.model('polls', schema);
