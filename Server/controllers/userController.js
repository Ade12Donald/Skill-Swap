import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { AppError } from "../utils/errorHandling.js";
import logger from "../utils/logger.js";

export const createUser = async (req, res, next) => {
  try {
    const { skillToLearn, skillToTeach } = req.body;

    const teachTitle = skillToTeach.map((values) => values.title);
    const learnTitle = skillToLearn.map((values) => values.title);

    const dummyTeach = [...new Set(teachTitle)];
    const dummyLearn = [...new Set(learnTitle)];

    for (const elements of skillToLearn) {
      if (teachTitle.includes(elements.title)) {
        throw new AppError("You can't want to learn what you can teach", 400);
      }
    }

    if (teachTitle.size != dummyTeach.length)
      throw new AppError("You can't have duplicate skill", 400);

    if (learnTitle.size != dummyLearn.length)
      throw new AppError("You can't have duplicate skill", 400);

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

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (!userExist) throw new AppError("User not Found", 404);

    if (!bcrypt.compare(password, userExist.password))
      throw new AppError("Password Incorrect", 400);

    res.status(200).json({
      status: "successful",
      message: "Welcome back",
      data: userExist,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel.findById(id);

    if (!user) throw new AppError("User not Found", 404);

    res.status(200).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      firstName,
      lastName,
      age,
      email,
      password,
      skillToLearn,
      skillToTeach,
    } = req.body;

    if (skillToLearn || skillToTeach) {
      const teachTitle = skillToTeach.map((values) => values.title);
      const learnTitle = skillToLearn.map((values) => values.title);

      const dummyTeach = [...new Set(teachTitle)];
      const dummyLearn = [...new Set(learnTitle)];

      for (const elements of skillToLearn) {
        if (teachTitle.includes(elements.title)) {
          throw new AppError("You can't want to learn what you can teach", 400);
        }
      }

      if (teachTitle.size != dummyTeach.length)
        throw new AppError("You can't have duplicate skills", 400);

      if (learnTitle.size != dummyLearn.length)
        throw new AppError("You can't have duplicate skills", 400);
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        age,
        email,
        skillToLearn,
        skillToTeach,
      },
      {
        runValidators: true,
        returnDocument: "after",
      },
    );
    if (!user) throw new AppError("User Not Found", 404);

    if (password) {
      user.password = password;
      await user.save();
    }
    res.status(200).json({
      status: "successful",
      data: user,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
