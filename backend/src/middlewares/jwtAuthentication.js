import jwt from "jsonwebtoken";
import { ResponseHandler } from "#helpers";
import ENV from "#env";

const JWT_SECRET = ENV.JWT.secretKey;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ResponseHandler.unauthorized(res, null, "Missing or invalid token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return ResponseHandler.unauthorized(res, null, "Invalid or expired token");
  }
};

export default authenticate;
