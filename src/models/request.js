import prisma from "../db/prisma.js";

const findMany = async (userId) => {
  const requests = await prisma.user.findMany({
    where: {
      id: userId,
    },
    select: {
      sentRequests: {
        include: {
          receiver: true,
        },
      },
      receivedRequests: {
        include: {
          sender: true,
        },
      },
    },
  });
  return requests;
};

const create = async (senderId, receiverId) => {
  const request = await prisma.request.create({
    data: {
      senderId,
      receiverId,
    },
  });
  return request;
};

const destroy = async (id) => {
  const deletedRequest = await prisma.request.delete({
    where: {
      id,
    },
  });
  return deletedRequest;
};

const exists = async (userIdA, userIdB) => {
  const requestA = await prisma.request.findFirst({
    where: {
      senderId: userIdA,
      receiverId: userIdB,
    },
  });

  if (requestA) return true;

  const requestB = await prisma.request.findFirst({
    where: {
      senderId: userIdB,
      receiverId: userIdA,
    },
  });

  if (requestB) return true;
  return false;
};

export default { exists, findMany, create, destroy };
