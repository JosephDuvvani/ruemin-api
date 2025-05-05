import prisma from "../db/prisma.js";

const find = async (userId) => {
  const requests = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      sentRequests: {
        include: {
          receiver: {
            include: {
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
      receivedRequests: {
        include: {
          sender: {
            include: {
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

export default { exists, find, create, destroy };
