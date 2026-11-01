import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/envision_studio';

export async function connectDB(uri: string = MONGODB_URI): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  try {
    await mongoose.connect(uri);
    console.log(`[MongoDB] Connected successfully to ${uri}`);
    return mongoose;
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('[MongoDB] Disconnected successfully');
  }
}

export default mongoose;
