import userModel from "../models/userModel.js";
import logger from "../utils/logger.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);

    logger.info("User registered successfully", { userId: String(user._id) });
    res.status(201).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
