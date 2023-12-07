import { Document, Schema, model, Types } from 'mongoose';

interface IPost extends Document {
  delete(): unknown;
  username: string;
  userId: Types.ObjectId;
  title: string;
  link: string;
  body: string;
  upvotes: number;
  downvotes: number;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    downvotes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = model<IPost>('Post', PostSchema);

export default PostModel;
export { IPost };