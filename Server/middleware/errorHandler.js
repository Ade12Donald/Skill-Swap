import { ZodError } from "zod";
import { AppError } from "../utils/errorHandling.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json(
      err.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    );
  } else if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      ERROR: err.message,
    });
  } else if (err.code === 11000) {
    console.log(err);
    return res.status(400).json({
      field: Object.keys(err.keyValue)[0],
      message: `${Object.keys(err.keyValue)[0]} already exist`,
    });
  } else {
    res.status(500).json({ ERROR: "Internal Server Error" });
  }
};
