import {
  addMedia,
  fetchAllMedia,
  fetchMediaById,
  deleteMediaById,
  updateMedia,
} from "../models/media-model.mjs";

const getItems = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

const getItemsById = async (req, res) => {
  const item = await fetchMediaById(req.params.id);
  if (item.error) {
    res.status(500);
    res.json(item);
  }
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found." });
  }
};

const postItem = async (req, res) => {
  console.log("uploaded file", req.file);
  console.log("uploaded form", req.body);
  console.log("new item posted", req.body);
  const { title, description, user_id } = req.body;
  const { filename, mimetype, size } = req.body;
  if (filename && title && user_id) {
    const newMedia = { title, description, user_id, filename, mimetype, size };
    const result = await addMedia(newMedia);
    res.status(201);
    res.json({ message: "New media item added.", ...result });
  } else {
    res.sendStatus(400);
  }
};

const deleteItem = async (req, res, id) => {
  try {
    const result = await deleteMediaById(id);
    if (result.success) {
      res.status(200).json({ message: `Item with id ${id} deleted.` });
    } else {
      res.status(404).json({ message: "Item not found." });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putItem = async (req, res, id) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", async () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);
      if (!body.title || !body.description) {
        res.status(400).json({ message: "Missing data." });
        return;
      }

      try {
        const result = await updateMedia(id, body);
        if (result.success) {
          res.status(200).json({ message: `Item with id ${id} updated.` });
        } else {
          res.status(404).json({ message: "Item not found." });
        }
      } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
};

export { getItems, getItemsById, postItem, deleteItem, putItem };
