import { Document, Schema, Types, Model, model } from 'mongoose';
import CommentModel, { IComment } from './comment.model';

interface IPost extends Document {
  title: string;
  link?: string;
  body?: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[];
  upvotes: Types.Array<Types.ObjectId>;
  downvotes: Types.Array<Types.ObjectId>;
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
      ref: 'User',
    }],
    downvotes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
  }],
  score: {
    type: Number,
    default: 0
    },
  },
  {
    timestamps: true,
  }
);

// NEW
// UPVOTE
PostSchema.method('upvote', async function (this: IPost, userId: string) {
  const userIdObject = new Types.ObjectId(userId)
  if (this.upvotes.includes(userIdObject)) {
    // could throw and error message here 
    return
  } else if (this.downvotes.includes(userIdObject)) {
    this.downvotes.pull(userId)
  }

  this.upvotes.push(userIdObject)
})


// NEW
// DOWNVOTE
PostSchema.method('downvote', async function (this: IPost, userId: string) {
  const userIdObject = new Types.ObjectId(userId)
  if (this.downvotes.includes(userIdObject)) {
    // could throw and error message here 
    return
  } else if (this.upvotes.includes(userIdObject)) {
    this.upvotes.pull(userIdObject)
  }

  this.downvotes.push(userIdObject)
})

// NEW
// Checks if score is modified and counts out a new score
PostSchema.pre<IPost>('save', function(next) {
  if (this.isModified('upvotes') || this.isModified('downvotes')) {
    this.score = this.upvotes?.length - this.downvotes?.length
  }
  next()
})

const Post = model<IPost, IPostModel>('Post', PostSchema);

export default Post;

