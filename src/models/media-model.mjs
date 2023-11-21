import { promisePool } from "../utils/database.mjs";

const fetchAllMedia = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM mediaItems");
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchMediaById = async (id) => {
  try {
    const sql = "SELECT * FROM mediaItems WHERE id=?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log("rows", rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const addMedia = async (media) => {
  const { user_id, filename, size, mimetype, title, description } = media;
  const sql = `INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const rows = await promisePool.query(sql, params);
    console.log("rows", rows);
    return { media_id: rows[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const deleteMediaById = async (id) => {
  const sql = "DELETE FROM mediaItems WHERE id=?";
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { success: true, message: "Media deleted successfully" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const updateMedia = async (id, updatedMedia) => {
  const { user_id, filename, size, mimetype, title, description } =
    updatedMedia;
  const sql = `UPDATE mediaItems 
               SET user_id=?, filename=?, filesize=?, media_type=?, title=?, description=?
               WHERE id=?`;
  const params = [user_id, filename, size, mimetype, title, description, id];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { success: true, message: "Media updated successfully" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export {
  fetchAllMedia,
  fetchMediaById,
  addMedia,
  deleteMediaById,
  updateMedia,
};
