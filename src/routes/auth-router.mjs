import Express from "express";
import { postLogin, getMe } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const authRouter = Express.Router();

authRouter.route("/login").post(postLogin);
authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
