import { Document, Schema, model, Types } from 'mongoose';

interface IComment {
  text: string;
  created: Date;
  author: Types.ObjectId;
}

interface IPost extends Document {
  author: Types.ObjectId;
  title: string;
  link: string;
  content: string;
  image?: string;
  public_id?: string;
  upvotes?: number;
  downvotes?: number;
  comments?: IComment[];
}

const CommentSchema = new Schema<IComment>({
  text: String,
  created: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

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
    image: {
      type: String,
    },
    public_id: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    upvotes: {
      type: Number,
    },
    downvotes: {
      type: Number,
    },
    comments: [CommentSchema], // Using the CommentSchema for comments
  },
  { timestamps: true }
);

const PostModel = model<IPost>('Post', PostSchema);

export default PostModel;
export { IPost };
