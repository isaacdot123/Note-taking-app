import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Debug: This should NOT say 'undefined'
        console.log("Connecting to:", process.env.MONGO_URI ? "URI found" : "URI UNDEFINED");
        
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully"); 

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
