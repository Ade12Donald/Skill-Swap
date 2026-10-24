import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { validate } from "../middleware/validateSchema.js";
import { userSchema } from "../schema/userSchema.js";

const route = Router();

route.post("/create", validate(userSchema), createUser);

export default route;
