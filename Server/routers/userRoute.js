import { Router } from "express";
import {
  createUser,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";
import { validate } from "../middleware/validateSchema.js";
import { userSchema } from "../schema/userSchema.js";
import loginSchema from "../schema/loginSchema.js";

const route = Router();

route.post("/create", validate(userSchema), createUser);
route.get("/login", validate(loginSchema), loginUser);
route.get("/get", getUser);
route.patch("/update", validate(userSchema.partial()), updateUser);

export default route;
