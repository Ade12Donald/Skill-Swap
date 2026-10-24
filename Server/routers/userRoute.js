import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { validate } from "../middleware/validateSchema.js";
import { userSchema } from "../schema/userSchema.js";
import loginSchema from "../schema/loginSchema.js";

const route = Router();

route.post("/create", validate(userSchema), createUser);
route.post("/login", validate(loginSchema), loginUser);

export default route;
