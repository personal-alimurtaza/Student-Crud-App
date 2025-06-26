import bcrypt from "bcrypt";

class HashHelper {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(plainText, hashedPassword) {
    return await bcrypt.compare(plainText, hashedPassword);
  }
} 

export default HashHelper;
