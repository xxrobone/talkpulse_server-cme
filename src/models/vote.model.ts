import { Document, Schema, Types, Model, model } from 'mongoose';

interface IVote extends Document {
  userId: Types.ObjectId;
  targetId: Types.ObjectId;
  targetType: 'post' | 'comment';
  voteType: 'upvote' | 'downvote';
}

const VoteSchema = new Schema<IVote>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Replace with your actual User model reference
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ['post', 'comment'],
      required: true,
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote'],
      required: true,
    },
  },
  { timestamps: true }
);

const VoteModel = model<IVote>('Vote', VoteSchema);

// Voting method
VoteSchema.static('vote', async function (
  userId: string,
  targetId: string,
  targetType: 'post' | 'comment',
  voteType: 'upvote' | 'downvote'
) {
  // Check if the user has already voted for the target
  const existingVote = await this.findOne({
    userId: new Types.ObjectId(userId),
    targetId: new Types.ObjectId(targetId),
    targetType,
  });

  if (existingVote) {
    // User has already voted, update the voteType
    existingVote.voteType = voteType;
    await existingVote.save();
  } else {
    // User has not voted, create a new vote
    await this.create({
      userId: new Types.ObjectId(userId),
      targetId: new Types.ObjectId(targetId),
      targetType,
      voteType,
    });
  }
});

export default VoteModel;
export { IVote };
