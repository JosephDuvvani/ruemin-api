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

export { usersGet };
