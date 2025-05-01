import models from "../models/index.js";

const requestsGet = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await models.Request.findMany(id);
    const requests = data.map((request) => ({
      sent: request.sentRequests,
      received: request.receivedRequests,
    }));
    return res.json({ requests });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting user chat requests",
      error: err,
    });
  }
};

const requestPost = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId } = req.body;

  if (!receiverId) {
    return res.status(400).json({
      error: { msg: "Receiver's id is required" },
    });
  }

  if (senderId === receiverId) {
    return res.status(400).json({
      error: { msg: "Sender and receiver cannot be the same user" },
    });
  }

  try {
    const exists = await models.Request.exists(senderId, receiverId);
    if (exists) {
      return res.status(400).json({
        error: { msg: "A request already exists between users" },
      });
    }

    const request = await models.Request.create(senderId, receiverId);
    return res.status(201).json({ request });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating request",
      error: err,
    });
  }
};

const acceptRequestPost = async (req, res) => {
  const { requestId } = req.params;
  if (!requestId) {
    return res.status(400).json({
      error: { msg: "Request id is required" },
    });
  }

  try {
    const request = await models.Request.destroy(requestId);
    if (!request) {
      return res.status(404).json({
        error: { msg: "Request not found" },
      });
    }

    const chat = await models.Chat.create(request.senderId, request.receiverId);
    return res.status(201).json({ chat });
  } catch (err) {
    return res.status(500).json({
      message: "Error accepting request",
      error: err,
    });
  }
};

const rejectRequestPost = async (req, res) => {
  const { requestId } = req.params;
  if (!requestId) {
    return res.status(400).json({
      error: { msg: "Request id is required" },
    });
  }

  try {
    const request = await models.Request.destroy(requestId);
    if (!request) {
      return res.status(404).json({
        error: { msg: "Request not found" },
      });
    }

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      message: "Error accepting request",
      error: err,
    });
  }
};

export { requestsGet, requestPost, acceptRequestPost, rejectRequestPost };
