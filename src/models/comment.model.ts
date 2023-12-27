import { Document, Schema, Types, model } from 'mongoose';
import VoteModel, { IVote } from './vote.model';

interface IComment extends Document {
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  parentComment_id?: Types.ObjectId;
  author: Types.ObjectId;
  upvotes: Types.Array<IVote['_id']>;
  downvotes: Types.Array<IVote['_id']>;
  upvote: (userId: string) => Promise<void>;
  downvote: (userId: string) => Promise<void>;
}

const CommentSchema = new Schema<IComment>(
  {
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    parentComment_id: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Vote',
    }],
    downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Vote',
    }],
  },
  { timestamps: true }
);

// Updated upvote method
CommentSchema.method('upvote', async function (this: IComment, userId: string): Promise<void> {
  const userIdObject = new Types.ObjectId(userId);
  const existingUpvote = this.upvotes.find(voteId => voteId.equals(userIdObject));

  if (existingUpvote) {
    // User has already upvoted, do nothing or handle accordingly
    return;
  } else {
    const newUpvote = new VoteModel({
      userId: userIdObject,
      targetId: this._id,
      targetType: 'comment',
      voteType: 'upvote',
    });

    this.upvotes.push(newUpvote._id);

    await Promise.all([newUpvote.save(), this.save()]);
  }
});

// Updated downvote method
CommentSchema.method('downvote', async function (this: IComment, userId: string): Promise<void> {
  const userIdObject = new Types.ObjectId(userId);
  const hasDownvoted = this.downvotes.some(voteId => voteId.equals(userIdObject));

  if (hasDownvoted) {
    // User has already downvoted, do nothing or handle accordingly
    return;
  } else {
    const newDownvote = new VoteModel({
      userId: userIdObject,
      targetId: this._id,
      targetType: 'comment',
      voteType: 'downvote',
    });

    this.downvotes.push(newDownvote._id);

    await Promise.all([newDownvote.save(), this.save()]);
  }
});

const CommentModel = model<IComment>('Comment', CommentSchema);

export default CommentModel;
export { IComment };
