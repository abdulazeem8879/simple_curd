import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  age: { type: String },
  mobile: { type: String },
  address: { type: String },
  password: { type: String },
});

// Model name is "User", and MongoDB will use "users" as the collection name.
const userModel = mongoose.model("User", userSchema);

export default userModel;
