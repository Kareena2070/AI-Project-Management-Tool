import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Try environment variable first, but validate its scheme. If it's missing or invalid,
    // fall back to a local MongoDB URL.
    // Note: ensure you have a running MongoDB instance or set a valid MONGO_URI in .env
    const envUri = process.env.MONGO_URI;
    const isValidEnvUri = typeof envUri === "string" && (envUri.startsWith("mongodb://") || envUri.startsWith("mongodb+srv://"));
    const mongoURI = isValidEnvUri ? envUri : "mongodb://localhost:27017/mydatabase";
    if (!isValidEnvUri && envUri) {
      console.warn("⚠️ MONGO_URI in .env is invalid or missing scheme; using fallback local MongoDB URI");
    }
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
