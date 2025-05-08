import mongoose from "mongoose";

const dbConnection = async (dburl) => {
  try {
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);

    // Throw the error to stop the server if the database connection fails
    throw new Error("Database connection failed. Please check your DB URL and connection.");
  }
};

export default dbConnection;
