import jwt from "jsonwebtoken";
import ENV from "#env";

const JWT_SECRET = ENV.JWT.secretKey;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export default generateToken;