import Express from "express";
import {
  deleteItem,
  getItems,
  getItemsById,
  postItem,
  putItem,
} from "../controllers/media-controller.mjs";
import upload from "../middlewares/upload.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
// import { logger } from "../middlewares/middlewares.mjs";

const mediaRouter = Express.Router();

// router specific middleware
// mediaRouter.use(logger);

mediaRouter
  .route("/api/media")
  .get(getItems)
  .post(authenticateToken, upload.single("file"), postItem);
mediaRouter.route("/:id").get(getItemsById).put(putItem).delete(deleteItem);

export default mediaRouter;
