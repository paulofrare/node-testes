module.exports = (app) => {
  const findAll = (req, resp, next) => {
    try {
      app.services.user.findAll().then((r) => resp.status(200).json(r));
    } catch (err) {
      next(err);
    }
  };

  const create = async (req, resp, next) => {
    try {
      const result = await app.services.user.save(req.body);
      return resp.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };

  return { findAll, create };
};
