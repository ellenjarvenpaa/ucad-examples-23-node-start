import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getItems,
  getItemsById,
  postItem,
  deleteItem,
  putItem,
} from "./items.js";
import {
  getUsers,
  getUserById,
  postUser,
  deleteUser,
  putUser,
} from "./users.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

// simple custom middleware for loggin/debugging all requests
app.use((req, res, next) => {
  console.log("Time:", Date.now(), req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  const values = {
    title: "Dummy REST API for media",
    message: "Media will be displayed here",
  };
  res.render("home", values);
});

// dummy routing example
app.get("/kukkuu", (request, response) => {
  const myResponse = { message: "No moro!" };
  //response.json(myResponse);
  response.sendStatus(200);
});

// other dummy pug example
app.get("/:message", (req, res) => {
  const values = { title: "Dummy REST API docs", message: req.params.message };
  res.render("home", values);
});

// example generic items api

// get all items
app.get("/api/media", getItems);
// get items by id
app.get("/api/media/:id", getItemsById);
// modify
app.put("/api/media", putItem);
// add new item
app.post("/api/media", postItem);
// remove existing item
app.delete("/api/media", deleteItem);

// get all items
app.get("/api/user", getUsers);
// get items by id
app.get("/api/user/:id", getUserById);
// modify
app.put("/api/user", putUser);
// add new item
app.post("/api/user", postUser);
// remove existing item
app.delete("/api/user", deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
