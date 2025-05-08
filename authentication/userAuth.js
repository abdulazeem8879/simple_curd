import bcrypt from "bcrypt";

export const hashPassword = async (password, saltRounds = 10) => {
    try {
        if (!password) throw new Error("Password is required");
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    } catch (error) {
        console.error(`Error while hashing password: ${error.message}`);
        return null; // You can also throw the error if preferred
    }
};


export const comparePass = async (password, dbpass) => {
    try {
      if (typeof password !== 'string' || typeof dbpass !== 'string') {
        console.error('❌ bcrypt.compare failed: One or both inputs are not strings', {
          passwordType: typeof password,
          dbpassType: typeof dbpass,
          password,
          dbpass
        });
        return false;
      }
  
      const isMatch = await bcrypt.compare(password, dbpass);
      return isMatch;
    } catch (error) {
      console.error(`Error while comparing passwords: ${error.message}`);
      return false;
    }
  };
  
