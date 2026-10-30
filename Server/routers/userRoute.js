import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";
import { validate } from "../middleware/validateSchema.js";
import { userSchema } from "../schema/userSchema.js";
import loginSchema from "../schema/loginSchema.js";

const route = Router();

route.post("/create", validate(userSchema), createUser);
route.post("/login", validate(loginSchema), loginUser);
route.get("/get", getUser);
route.patch("/update", validate(userSchema.partial()), updateUser);
route.delete("delete", deleteUser);

export default route;
