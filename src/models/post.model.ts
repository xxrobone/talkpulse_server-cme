import { Document, Schema, model, Types } from 'mongoose';

interface Post extends Document {
  title: string;
  link: string;
  body: string;
  user_id: Types.ObjectId;
}

const PostSchema = new Schema<Post>(
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
  },
  { timestamps: true }
);

export default model<Post>('Post', PostSchema);
