/**
 * Simple custom middleware for logging/debugging requests to console
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const logger = (req, res, next) => {
  console.log("Time:", Date.now(), req.method, req.url);
  next();
};

export { logger };
