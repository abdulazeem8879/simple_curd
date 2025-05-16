import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/connect.js";
import userRoute from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" })); // Or limit to your domain


// Connect to DB
(async () => {
  try {
    await dbConnection(process.env.DBURL);
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/user", userRoute);

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
