import bcrypt from "bcrypt";

// Function to hash a password
export const hashPassword = async (password, saltRounds = 10) => {
  try {
    if (!password) throw new Error("Password is required");
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed; // Return the hashed password
  } catch (error) {
    console.error(`Error while hashing password: ${error.message}`);
    return null; // Return null if hashing fails
  }
};

// Function to compare a plain text password with a hashed password
export const comparePass = async (password, dbpass) => {
  try {
    // Validate inputs
    if (!password || !dbpass) {
      console.error("Password or hashed password is missing");
      return false; // Return false if inputs are invalid
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, dbpass);
    return isMatch; // Return true if passwords match, false otherwise
  } catch (error) {
    console.error(`Error while comparing passwords: ${error.message}`);
    return false; // Return false if comparison fails
  }
};

