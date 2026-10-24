//NODE_MODULES IMPORTS
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";

//FILES IMPORT
import logger from "./utils/logger.js";
import userRoute from "./routers/userRoute.js";
import { errorMiddleware } from "./middleware/errorHandler.js";

//CONFIGURATION
const app = express();

//VARIABLES
const PORT = process.env.PORT;
const MONGO_URI = process.env.COMPASS_URI;

//MIDDLEWARE
app.use(express.json());
app.use(
  morgan("combined", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  }),
);
app.use("/user", userRoute);

app.use(errorMiddleware);

//CONNECTION
mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info("MONGODB CONNECTED SUCCESSFULLY");
    app.listen(PORT, () => logger.info(`SERVER IS RUNNING ON PORT ${PORT}`));
  })
  .catch((error) => {
    logger.error("MongoDB connection failed", {
      error: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });
