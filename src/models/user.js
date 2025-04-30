import prisma from "../db/prisma.js";

const exists = async (username) => {
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return !!userExists;
};
const create = async (username, password, firstname, lastname) => {
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      firstname,
      lastname,
    },
  });
  return newUser;
};

const find = async (username) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return foundUser;
};

const findById = async (id) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return foundUser;
};

const findMany = async (id) => {
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id,
      },
    },
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
  });
  return users;
};

const findChats = async (id) => {
  const chats = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      inbox: {
        include: {
          users: {
            select: {
              id: true,
              username: true,
              profile: {
                select: {
                  imageUrl: true,
                  firstname: true,
                  lastname: true,
                },
              },
            },
          },
          messages: true,
        },
      },
    },
  });
  return chats;
};

export default {
  exists,
  create,
  find,
  findById,
  findMany,
  findChats,
};
