import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("❌ MONGODB_URI is not defined in environment variables.");

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    if (!client || !client.db) {
      throw new Error("❌ MongoDB client is not initialized correctly.");
    }

    // Check if the client is already connected (MongoDB v4+ handles connections automatically)
    await client.connect();
    
    console.log("✅ MongoDB connected successfully!");
    return client.db("atsoptimizer"); // Ensure this matches your actual database name
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to database.");
  }
}

