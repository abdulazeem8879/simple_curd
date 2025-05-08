import { comparePass, hashPassword } from "../authentication/userAuth.js";
import { getOneUserServ, registerUser } from "../services/userServices.js";
import userModel from "../models/userModel.js";

// Register a new user
export const register = async (req, res) => {
  const { name, email, age, mobile, address, password } = req.body;

  try {
    const hashedPass = await hashPassword(password);
    if (!hashedPass) {
      return res.status(500).json({ message: "Error while hashing password" });
    }

    const result = await registerUser({
      name,
      email,
      age,
      mobile,
      address,
      password: hashedPass,
    });

    if (result.status === "success") {
      res.status(201).json({
        message: "User registered successfully",
        user: result.user,
      });
    } else {
      res.status(400).json({
        message: "Error while creating user",
        error: result.message,
      });
    }
  } catch (error) {
    console.error(`Error while registering user: ${error.message}`);
    res.status(500).json({
      message: "Server error while creating user",
      error: error.message,
    });
  }
};

// Get one user by email and password
export const getOneUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Fetch user by email
    const user = await getOneUserServ(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the user has a password stored in the database
    if (!user.password) {
      return res.status(500).json({ message: "User password is missing in the database" });
    }

    // Compare passwords
    const isPasswordCorrect = await comparePass(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user._doc || user;

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(`Error during user login: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error(`Error while fetching all users: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update one user by ID
export const updateoneUser = async (req, res) => {
  const { name, email, age, mobile, address, password } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const hashedPass = password ? await hashPassword(password) : undefined;

    const user = await userModel.findByIdAndUpdate(
      id,
      { name, email, age, mobile, address, password: hashedPass },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(`Error while updating user: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete one user by ID
export const deleteOneUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(`Error while deleting user: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete all users
export const deleteAllUsers = async (req, res) => {
  try {
    const result = await userModel.deleteMany({});

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No users found to delete" });
    }

    res.status(200).json({
      message: "All users deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(`Error while deleting all users: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};


