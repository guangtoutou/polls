import mongoose from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
  {
    vote: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    pollId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { timestamp: true }
);

export default mongoose.model('vote', schema);
