import mongoose from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
  {
    question: { type: String },
    choices: [{ type: String }],
    expired: { type: Boolean, default: false },
    expiredAt: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { timestamp: true }
);

export default mongoose.model('polls', schema);
