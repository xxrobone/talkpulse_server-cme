import { Document, Schema, model, Types } from 'mongoose';

interface IPost extends Document {
  delete(): unknown;
  title: string;
  link: string;
  body: string;
  votes: number;
  user_id: Types.ObjectId;
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
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    votes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = model<IPost>('Post', PostSchema);

export default PostModel;
export { IPost };
