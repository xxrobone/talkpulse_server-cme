import { Document, Schema, model, MongooseError } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  confirmed: Boolean;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirmed: {
      type: Boolean,
      default: false,
      required: true,
    },
    profileImage: {
      type: String,
      default: '',
      required: false,
    },
    role: {
      type: String,
      default: 'User',
    },
  },
  { timestamps: true }
);

// adding the hassed password transformation here is more secure in production
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
  } catch (error) {
      if (error instanceof MongooseError) next(error);
      else throw error;
  }
})

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
export { IUser };

