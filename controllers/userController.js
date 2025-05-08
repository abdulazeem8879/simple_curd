import { comparePass, hashPassword } from "../authentication/userAuth.js";
import { getOneUserServ, registerUser } from "../services/userServices.js";
import userModel from "../models/userModel.js";

export const register = async (req, res) => {
  let { name, email, age, mobile, address, password } = req.body;

  let hashedPass = await hashPassword(password);
  try {
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
    res.status(500).json({
      message: "Server error while creating user",
      error: error.message,
    });
  }
};

export const getOneUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user by email
    const user = await getOneUserServ(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored password
    const isPasswordCorrect = await comparePass(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Exclude the password from the response
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

export const updateoneUser=async (req, res) => {

  let { name, email, age, mobile, address, password } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      { name, email, age, mobile, address, password },
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

}

export const deleteOneUser=async (req, res) => {
  const { id } = req.params;
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
}
// export const deleteAllUsers=async (req, res) => {
//   try {
//     const result = await userModel.deleteMany({});

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "No users found to delete" });
//     }

//     res.status(200).json({
//       message: "All users deleted successfully",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.error(`Error while deleting all users: ${error.message}`);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }


