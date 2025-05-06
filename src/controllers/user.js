import models from "../models/index.js";

const usersGet = async (req, res) => {
  const currentUser = req.user;
  try {
    const users = await models.User.findMany(currentUser.id);
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting users",
      error: err,
    });
  }
};

const userDetailsGet = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await models.User.findById(userId);
    if (!user) {
      res
        .status(404)
        .json({ error: { msg: "Could not find user with given id" } });
    }
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting user",
      error: err,
    });
  }
};

export { usersGet, userDetailsGet };
