const users = [
  {
    user_id: 260,
    username: "VCHar",
    password: "********",
    email: "vchar@example.com",
    user_level_id: 1,
    created_at: "2020-09-12T06:56:41.000Z",
  },
  {
    user_id: 305,
    username: "Donatello",
    password: "********",
    email: "dona@example.com",
    user_level_id: 1,
    created_at: "2021-12-11T06:00:41.000Z",
  },
  {
    user_id: 3609,
    username: "Anon5468",
    password: "********",
    email: "x58df@example.com",
    user_level_id: 3,
    created_at: "2023-04-02T05:56:41.000Z",
  },
];

/**
 * Gets all users
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */
const getUsers = (req, res) => {
  const limit = req.query.limit;
  // TODO: check that the param value is an integer before using
  if (limit) {
    res.json(users.slice(0, limit));
  } else {
    res.json(users);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getUserById = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found." });
  }
};

const postUser = (req, res) => {
  console.log("new user posted", req.body);
  if (
    req.body.username &&
    req.body.password &&
    req.body.email &&
    req.body.user_level_id
  ) {
    users.push({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      user_level_id: req.body.user_level_id,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = (req, res, id) => {
  const index = users.findIndex((user) => user.user_id == id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).json({ message: `User with id ${id} deleted.` });
  } else {
    res.status(404).json({ message: "User not found." });
  }
};

const putUser = (req, res, id) => {
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
      if (
        !body.username ||
        !body.password ||
        !body.email ||
        !body.user_level_id
      ) {
        res.status(400).json({ message: "Missing data." });
        return;
      }
      const index = users.findIndex((user) => user.user_id == id);
      if (index !== -1) {
        users[index].username = body.username;
        users[index].password = body.password;
        users[index].email = body.email;
        users[index].user_level_id = body.user_level_id;
        res.status(200).json({ message: `User with id ${id} updated.` });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
