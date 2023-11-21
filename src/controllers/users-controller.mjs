import {
  fetchAllUsers,
  fetchUserById,
  addUser,
  deleteUserById,
  updateUser,
} from "../models/user-model.mjs";

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
  console.log("new user posted", req.body);
  const { username, password, email, user_level_id } = req.body;

  if (username && password && email && user_level_id) {
    const newUser = {
      username,
      password,
      email,
      user_level_id,
    };

    try {
      const result = await addUser(newUser);
      res.status(201).json({ user_id: result.user_id });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Missing data." });
  }
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
