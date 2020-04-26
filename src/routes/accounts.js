module.exports = (app) => {
  const getAll = async (req, resp) => {
    const result = await app.services.account.findAll();
    return resp.status(200).json(result);
  };

  const create = async (req, resp, next) => {
    try {
      const result = await app.services.account.save(req.body);
      return resp.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };
  const get = async (req, resp, next) => {
    try {
      const result = await app.services.account.find({ id: req.params.id });
      return resp.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  };

  const update = async (req, resp, next) => {
    try {
      const result = await app.services.account.update(req.params.id, req.body);
      return resp.status(200).json(result[0]);
    } catch (err) {
      return next(err);
    }
  };

  const remove = async (req, resp, next) => {
    try {
      await app.services.account.remove(req.params.id);
      return resp.status(204).send();
    } catch (err) {
      return next(err);
    }
  };

  return { getAll, create, get, update, remove };
};
