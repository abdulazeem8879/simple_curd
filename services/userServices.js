import userModel from "../models/userModel.js";

export const registerUser = async (data) => {
  try {
    const u1 = new userModel(data);
    await u1.save();
    return { status: "success", user: u1 };
  } catch (error) {
    console.error(`❌ Error while saving data: ${error.message}`);
    return { status: "error", message: error.message };
  }
};

export const getOneUserServ = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    return user.password// Return the full user document
  } catch (error) {
    console.error(`Error while fetching user: ${error.message}`);
    return null;
  }
};
