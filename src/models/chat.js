import prisma from "../db/prisma.js";

const create = async (userIdA, userIdB) => {
  const chat = await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: userIdA }, { id: userIdB }],
      },
    },
  });
  return chat;
};

const exists = async (id) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
  });
  return !!chat;
};

export default { create, exists };
