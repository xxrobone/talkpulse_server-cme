import { Document, Schema, model, Types } from 'mongoose';

interface IComment extends Document {
  body: string;
  user_id: Types.ObjectId;
  post_id: Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    body: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true }
);


const CommentModel = model<IComment>('Post', CommentSchema);

export default CommentModel;
export { IComment };
