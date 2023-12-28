// comment.model.ts

import { Document, Schema, Types, model, Model } from 'mongoose';

interface IComment extends Document {
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  parentComment_id?: Types.ObjectId;
  author: Types.ObjectId;
  upvotes: Types.Array<Types.ObjectId>;
  downvotes: Types.Array<Types.ObjectId>;
  score: number;
  upvote: (userId: string) => void;
  downvote: (userId: string) => void;
}

interface ICommentProps {
  comments: Types.DocumentArray<IComment>;
  upvote: (userId: string) => void;
  downvote: (userId: string) => void;
}

type ICommentModel = Model<IComment, {}, ICommentProps>;

const CommentSchema = new Schema<IComment, ICommentModel>(
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
      ref: 'User',
    }],
    downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// UPVOTE
CommentSchema.method('upvote', async function (this: IComment, userId: string) {
  const userIdObject = new Types.ObjectId(userId);
  if (this.upvotes.includes(userIdObject)) {
    return; // Already upvoted
  } else if (this.downvotes.includes(userIdObject)) {
    this.downvotes.pull(userIdObject);
  }

  this.upvotes.push(userIdObject);
  this.score = this.upvotes.length - this.downvotes.length;
});

// DOWNVOTE
CommentSchema.method('downvote', async function (this: IComment, userId: string) {
  const userIdObject = new Types.ObjectId(userId);
  if (this.downvotes.includes(userIdObject)) {
    return; // Already downvoted
  } else if (this.upvotes.includes(userIdObject)) {
    this.upvotes.pull(userIdObject);
  }

  this.downvotes.push(userIdObject);
  this.score = this.upvotes.length - this.downvotes.length;
});

const Comment = model<IComment, ICommentModel>('Comment', CommentSchema);

export default Comment;
export { IComment };
