import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const UserModel = model<IUser>('User', UserSchema);;

export default UserModel;
export { IUser };

