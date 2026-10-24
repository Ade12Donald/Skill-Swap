import userModel from "../models/userModel.js";
import { AppError } from "../utils/errorHandling.js";
import logger from "../utils/logger.js";

export const createUser = async (req, res, next) => {
  try {
    const { skillToLearn, skillToTeach } = req.body;

    const teachTitle = skillToTeach.map((values) => values.title);

    for (const elements of skillToLearn) {
      if (teachTitle.includes(elements.title)) {
        throw new AppError("You can't want to learn what you can teach", 400);
      }
    }
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
