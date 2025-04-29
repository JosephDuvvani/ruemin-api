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

export default {
  exists,
  create,
  find,
  findById,
};
