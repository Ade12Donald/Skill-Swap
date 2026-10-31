import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandling.js";
import logger from "../utils/logger.js";

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new AppError("User not logged In", 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(error);
    throw new AppError("Invalid or Expired token", 401);
  }
};

export default auth;
