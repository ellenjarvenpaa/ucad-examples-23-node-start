import { Express } from "express";
import {
  deleteItem,
  getItems,
  getItemsById,
  postItem,
  putItem,
} from "../controllers/media-controller.mjs";

const mediaRouter = Express.Router();

mediaRouter.route("/api/media").get(getItems).post(postItem);
mediaRouter.route("/:id").get(getItemsById).put(putItem).delete(deleteItem);

export default mediaRouter;
