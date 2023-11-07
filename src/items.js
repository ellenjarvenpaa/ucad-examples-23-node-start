const mediaItems = [
  {
    media_id: 9632,
    filename: "ffd8.jpg",
    filesize: 887574,
    title: "Favorite drink",
    description: "",
    user_id: 1606,
    media_type: "image/jpeg",
    created_at: "2023-10-16T19:00:09.000Z",
  },
  {
    media_id: 9626,
    filename: "dbbd.jpg",
    filesize: 60703,
    title: "Miika",
    description: "My Photo",
    user_id: 3671,
    media_type: "image/jpeg",
    created_at: "2023-10-13T12:14:26.000Z",
  },
  {
    media_id: 9625,
    filename: "2f9b.jpg",
    filesize: 30635,
    title: "Aksux",
    description: "friends",
    user_id: 260,
    media_type: "image/jpeg",
    created_at: "2023-10-12T20:03:08.000Z",
  },
  {
    media_id: 9592,
    filename: "f504.jpg",
    filesize: 48975,
    title: "Desert",
    description: "",
    user_id: 3609,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:59:05.000Z",
  },
  {
    media_id: 9590,
    filename: "60ac.jpg",
    filesize: 23829,
    title: "Basement",
    description: "Light setup in basement",
    user_id: 305,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:56:41.000Z",
  },
];

/**
 * Gets all items
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */
const getItems = (req, res) => {
  const limit = req.query.limit;
  // TODO: check that the param value is int before using
  if (limit) {
    res.json(mediaItems.slice(0, limit));
  } else {
    res.json(mediaItems);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItemsById = (req, res) => {
  const item = mediaItems.find((element) => element.media_id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found." });
  }
};

const postItem = (req, res) => {
  console.log("new item posted", req.body);
  if (
    req.body.filename &&
    req.body.title &&
    req.body.description &&
    req.body.user_id &&
    req.body.media_type
  ) {
    mediaItems.push({
      filename: req.dody.filename,
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      media_type: req.body.media_type,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const deleteItem = (req, res, id) => {
  const index = mediaItems.findIndex((item) => item.media_id == id);
  if (index !== -1) {
    mediaItems.splice(index, 1);
    res.status(200).json({ message: `Item with id ${id} deleted.` });
  } else {
    res.status(404).json({ message: "Item not found." });
  }
};

const putItem = (req, res, id) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);
      if (!body.title || !body.description) {
        res.status(400).json({ message: "Missing data." });
        return;
      }
      const index = mediaItems.findIndex((item) => item.media_id == id);
      if (index !== -1) {
        mediaItems[index].title = body.title;
        mediaItems[index].description = body.description;
        res.status(200).json({ message: `Item with id ${id} updated.` });
      } else {
        res.status(404).json({ message: "Item not found." });
      }
    });
};

export { getItems, getItemsById, postItem, deleteItem, putItem };
