import express from "express";
import { deleteOneUser, getAllUsers, getOneUser, register, updateoneUser } from "../controllers/userController.js"; // Use the controller

const userRoute = express.Router();

// POST request for user registration
userRoute.post("/register", register);
userRoute.post('/getone',getOneUser)
userRoute.get("/getall",getAllUsers)
userRoute.put("/update/:id",updateoneUser);
userRoute.delete("/delete/:id",deleteOneUser)


export default userRoute;
