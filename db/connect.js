import mongoose from "mongoose";

const dbConnection = async (dburl) => {
  try {
    await mongoose.connect(dburl);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
    
  }
};

export default dbConnection;
