import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/connect.js";
import userRoute from "./routes/userRoutes.js";
import bodyParser from "body-parser";
// Initialize the app
const app = express();
app.use(bodyParser.json());
dotenv.config();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to DB
dbConnection(process.env.DBURL);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/user", userRoute);

// Optional: Default route

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
