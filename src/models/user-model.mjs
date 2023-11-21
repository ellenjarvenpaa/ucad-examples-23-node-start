import { promisePool } from "../utils/database.mjs";

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

const addUser = async (user) => {
  const { username, password, email, user_level_id } = user;
  const sql = `INSERT INTO Users (username, password, email, user_level_id) 
                 VALUES (?, ?, ?, ?)`;
  const params = [username, password, email, user_level_id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { user_id: result.insertId };
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

export { fetchAllUsers, fetchUserById, addUser, deleteUserById, updateUser };
