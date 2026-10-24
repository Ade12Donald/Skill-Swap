import userModel from "../models/userModel";
import logger from "../utils/logger";

export const createUser = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);

    logger.info("User registered successfully", { userId: String(user._id) });
    res.status(201).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
