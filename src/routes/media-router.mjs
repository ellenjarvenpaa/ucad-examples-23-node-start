import Express from "express";
import multer from "multer";
import {
  deleteItem,
  getItems,
  getItemsById,
  postItem,
  putItem,
} from "../controllers/media-controller.mjs";
// import { logger } from "../middlewares/middlewares.mjs";

const mediaRouter = Express.Router();
const upload = multer({ dest: "uploads/" });

// router specific middleware
// mediaRouter.use(logger);

mediaRouter
  .route("/api/media")
  .get(getItems)
  .post(upload.single("file"), postItem);
mediaRouter.route("/:id").get(getItemsById).put(putItem).delete(deleteItem);

export default mediaRouter;
