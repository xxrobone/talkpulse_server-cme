import { Schema, Document, Types, model } from 'mongoose';

interface IVote extends Document {
  user: Types.ObjectId;
}

const VoteSchema = new Schema<IVote>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Vote = model<IVote>('Vote', VoteSchema);

export { IVote, Vote };