import { Express } from "express";
import {
  getUsers,
  getUserById,
  putUser,
  postUser,
  deleteUser,
} from "../controllers/user-controller.mjs";

const userRouter = Express.Router();

userRouter.route("/").get(getUsers).post(postUser);
userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
