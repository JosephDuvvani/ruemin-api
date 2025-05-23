import prisma from "../db/prisma.js";

const create = async (userIdA, userIdB) => {
  const chat = await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: userIdA }, { id: userIdB }],
      },
    },
    include: {
      messages: true,
      users: {
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              firstname: true,
              lastname: true,
              imageUrl: true,
            },
          },
        },
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

const existsWithUser = async (id, userId) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
  return !!chat;
};

const find = async (id, userId) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      messages: {
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              profile: {
                select: {
                  firstname: true,
                  lastname: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      },
      users: {
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              firstname: true,
              lastname: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });
  return chat;
};

export default { create, exists, existsWithUser, find };
