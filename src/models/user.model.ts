import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
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
    profileImage: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'User',
    },
  },
  { timestamps: true }
);

// adding the hassed password transformation here is more secure in production
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
})

/* UserSchema.pre('validate', async function (next) {
  if (this.isModified('password')) next()
    
  const validated = await bcrypt.compare(this.password, user.password);
}) */

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
export { IUser };

