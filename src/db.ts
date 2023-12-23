// db.ts
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURL = process.env.DB_URL;
  if (!mongoURL) {
    throw new Error('Missing db url');
  }

  try {
    await mongoose.connect(mongoURL);
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectDB;
