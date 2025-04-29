import prisma from "../db/prisma.js";

const exists = async (token) => {
  const tokenExists = await prisma.token.findUnique({
    where: {
      jwt: token,
    },
  });
  return !!tokenExists;
};

const create = async (token) => {
  const newToken = await prisma.token.create({
    data: {
      jwt: token,
    },
  });
  return newToken;
};

const find = async (token) => {
  const foundToken = await prisma.token.findUnique({
    where: {
      jwt: token,
    },
  });
  return foundToken;
};

const destroy = async (token) => {
  const deletedToken = await prisma.token.delete({
    where: {
      jwt: token,
    },
  });
  return deletedToken;
};

export default {
  exists,
  create,
  find,
  destroy,
};
