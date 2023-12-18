import { Document, Schema, Types, model } from 'mongoose';

interface IComment extends Document {
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  parentComment_id?: Types.ObjectId;
  author: Types.ObjectId; 
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
  },
  { timestamps: true }
);

const CommentModel = model<IComment>('Comment', CommentSchema);

export default CommentModel;
export { IComment };
