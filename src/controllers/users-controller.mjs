import { validationResult } from "express-validator";
import {
  fetchAllUsers,
  fetchUserById,
  addUser,
  deleteUserById,
  updateUser,
} from "../models/user-model.mjs";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  const users = await fetchAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const item = await fetchUserById(req.params.id);
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

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log(errors.array());
    return res.status(400).json({ message: "invalid input fields" });
  }
  const newUser = req.body;
  const salt = await bcrypt.genSalt(10);
  // replace plain text password with hash
  newUser.password = await bcrypt.hash(newUser.password, salt);
  // console.log('postUser', newUser);
  const newUserId = await addUser(newUser);
  res.status(201).json({ message: "user added", user_id: newUserId });
};

const deleteUser = async (req, res, id) => {
  try {
    const result = await deleteUserById(id);
    if (result.success) {
      res.status(200).json({ message: `User with id ${id} deleted.` });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putUser = async (req, res, id) => {
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
      const { username, password, email, user_level_id } = body;

      if (!username || !password || !email || !user_level_id) {
        res.status(400).json({ message: "Missing data." });
        return;
      }

      try {
        const result = await updateUser(id, body);
        if (result.success) {
          res.status(200).json({ message: `User with id ${id} updated.` });
        } else {
          res.status(404).json({ message: "User not found." });
        }
      } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
