import { promisePool } from "../utils/database.mjs";

/**
 * Fetch user from database based on user name/password pair
 *
 * @param {object} userCreds - Contains {username, password} properties
 * @returns user object
 */
const login = async (username) => {
  try {
    const sql = `SELECT user_id, username, password, email, user_level_id
                 FROM Users WHERE username = ?`;
    const params = [username];
    const result = await promisePool.query(sql, params);
    const [rows] = result; // first item in result array is the data rows
    // console.log('login, user found?', rows[0]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchAllUsers = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM users");
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchUserById = async (id) => {
  try {
    const sql = "SELECT * FROM users WHERE id=?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log("rows", rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Creates a new user in the database
 *
 * @param {object} user data
 * @returns {number} - id of the inserted user in db
 */
const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaults to 2 (normal user)
    const params = [user.username, user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const deleteUserById = async (id) => {
  const sql = "DELETE FROM Users WHERE user_id=?";
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { success: true, message: "User deleted successfully" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const updateUser = async (id, updatedUser) => {
  const { username, password, email, user_level_id } = updatedUser;
  const sql = `UPDATE Users 
                 SET username=?, password=?, email=?, user_level_id=?
                 WHERE user_id=?`;
  const params = [username, password, email, user_level_id, id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { success: true, message: "User updated successfully" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export {
  login,
  fetchAllUsers,
  fetchUserById,
  addUser,
  deleteUserById,
  updateUser,
};
