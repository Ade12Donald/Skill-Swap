import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandling";
import logger from "../utils/logger";

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new AppError("User not logged In", 401);
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    logger.error(error);
    throw new AppError("Invalid or Expired token", 401);
  }
};

export default auth;
