import prisma from "../db/prisma.js";

const create = async (content, senderId, chatId) => {
  const message = await prisma.chatMessage.create({
    data: {
      content,
      senderId,
      chatId,
    },
  });
  return message;
};

const destroy = async (id) => {
  const message = await prisma.chatMessage.delete({
    where: {
      id,
    },
  });
  return !!message;
};

export default { create, destroy };
