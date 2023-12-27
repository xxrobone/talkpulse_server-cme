import { Document, Schema, Types, Model, model } from 'mongoose';
import CommentModel, { IComment } from './comment.model';
import VoteModel, {IVote} from './vote.model';

interface IPost extends Document {
  title: string;
  link?: string;
  body?: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comments: Types.DocumentArray<IComment>;
  upvotes: Types.Array<IVote['_id']>;
  downvotes: Types.Array<IVote['_id']>;
  score: number;
}

interface IPostProps {
  comments: Types.DocumentArray<IComment>;
  upvote: (userId: string) => void;
  downvote: (userId: string) => void;
}

type IPostModel = Model<IPost, {}, IPostProps>;

const PostSchema = new Schema<IPost, IPostModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [CommentModel.schema],
    upvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Vote',
    }],
    downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'Vote',
    }],
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Updated upvote method
PostSchema.method('upvote', async function (this: IPost, userId: string) {
  const userIdObject = new Types.ObjectId(userId);
  const existingUpvote = this.upvotes.find(voteId => voteId.equals(userIdObject));
  
  if (existingUpvote) {
    // User has already upvoted, do nothing or handle accordingly
    return;
  } else {
    const newUpvote = new VoteModel({
      userId: userIdObject,
      targetId: this._id,
      targetType: 'post',
      voteType: 'upvote',
    });

    this.upvotes.push(newUpvote._id);

    await Promise.all([newUpvote.save(), this.save()]);
  }
});

// Updated downvote method
PostSchema.method('downvote', async function (this: IPost, userId: string) {
  const userIdObject = new Types.ObjectId(userId);
  const existingDownvote = this.downvotes.find(voteId => voteId.equals(userIdObject));
  
  if (existingDownvote) {
    // User has already downvoted, do nothing or handle accordingly
    return;
  } else {
    const newDownvote = new VoteModel({
      userId: userIdObject,
      targetId: this._id,
      targetType: 'post',
      voteType: 'downvote',
    });

    this.downvotes.push(newDownvote._id);

    await Promise.all([newDownvote.save(), this.save()]);
  }
});

// Updated pre-save hook
PostSchema.pre<IPost>('save', async function (next) {
  if (this.isModified('upvotes') || this.isModified('downvotes')) {
    const upvotesCount = await VoteModel.countDocuments({ targetId: this._id, targetType: 'post', voteType: 'upvote' });
    const downvotesCount = await VoteModel.countDocuments({ targetId: this._id, targetType: 'post', voteType: 'downvote' });
    this.score = upvotesCount - downvotesCount;
  }
  next();
});

const Post = model<IPost, IPostModel>('Post', PostSchema);

export { IPost };

export default Post;
