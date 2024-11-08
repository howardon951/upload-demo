import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please set MONGODB_URI in the .env file");
  }
  try {
    const clientOptions = {
      serverApi: {
        version: "1" as const,
        strict: true,
        deprecationErrors: true,
      },
    };

    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log("MongoDB connection successful!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
connectDB();
export default connectDB;
