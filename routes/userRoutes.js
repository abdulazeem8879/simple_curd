import express from "express";
import {
  deleteOneUser,
  deleteAllUsers,
  getAllUsers,
  getOneUser,
  register,
  updateoneUser,
} from "../controllers/userController.js"; // Import all controller functions

const userRoute = express.Router();

// Routes
userRoute.post("/register", register); // Register a new user
userRoute.post("/getone", getOneUser); // Get one user by email and password
userRoute.get("/getall", getAllUsers); // Get all users
userRoute.put("/update/:id", updateoneUser); // Update a user by ID
userRoute.delete("/delete/:id", deleteOneUser); // Delete a user by ID
userRoute.delete("/deleteall", deleteAllUsers); // Delete all users

export default userRoute;
