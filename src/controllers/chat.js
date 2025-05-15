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

const chatGet = async (req, res) => {
  const currentUser = req.user;
  const { chatId } = req.params;
  try {
    const chat = await models.Chat.find(chatId, currentUser.id);
    return res.json({ chat });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting chat",
      error: err,
    });
  }
};

const messagePost = async (req, res) => {
  const currentUser = req.user;
  const { chatId } = req.params;
  const { message } = req.body;
  try {
    const chatExists = await models.Chat.existsWithUser(chatId, currentUser.id);
    if (!chatExists) {
      return res.sendStatus(403);
    }

    const newMessage = await models.Message.create(
      message,
      currentUser.id,
      chatId
    );
    return res.status(201).json({ newMessage });
  } catch (err) {
    return res.status(500).json({
      message: "Error sending message",
      error: err,
    });
  }
};

export { chatsGet, chatGet, messagePost };
