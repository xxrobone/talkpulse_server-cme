import { Document, Schema, model, Types } from 'mongoose';


interface IPost extends Document {
  author: Types.ObjectId;
  title: string;
  link: string;
  content: string;
  image: String;
  upvotes: number;
  downvotes: number;
  comments: [];
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
    image: {
      type: String,
      public_id: String,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
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
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
        }
      }
    ]
  },
  { timestamps: true }
);

const PostModel = model<IPost>('Post', PostSchema);

export default PostModel;
export { IPost };