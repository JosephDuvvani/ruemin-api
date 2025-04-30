import models from "../models/index.js";

const chatsGet = async (req, res) => {
  const currentUser = req.user;
  try {
    const chats = await models.User.findChats(currentUser.id);
    return res.json({ chats });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting chats",
      error: err,
    });
  }
};

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

export { chatsGet, usersGet };
