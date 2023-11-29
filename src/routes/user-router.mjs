import Express from "express";
import {
  getUsers,
  getUserById,
  postUser,
  deleteUser,
  putUser,
} from "../controllers/users-controller.mjs";
import { body } from "express-validator";

const userRouter = Express.Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("email").trim().isEmail(),
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 8 }),
    postUser
  );
userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
