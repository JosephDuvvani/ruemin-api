import prisma from "../db/prisma.js";

const findById = async (id) => {
  const foundProfile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });
  return foundProfile;
};

const findByUserId = async (userId) => {
  const foundProfile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });
  return foundProfile;
};

const create = async (userId, firstname, lastname, imageUrl, bio) => {
  const newProfile = await prisma.profile.create({
    data: {
      userId,
      firstname,
      lastname,
      imageUrl,
      bio,
    },
  });
  return newProfile;
};

const update = async (id, firstname, lastname, imageUrl, bio) => {
  const updatedProfile = await prisma.profile.update({
    where: {
      id,
    },
    data: {
      firstname,
      lastname,
      imageUrl,
      bio,
    },
  });
  return updatedProfile;
};

const updateName = async (id, firstname, lastname) => {
  const updatedProfile = await prisma.profile.update({
    where: {
      id,
    },
    data: {
      firstname,
      lastname,
    },
  });
  return updatedProfile;
};

const updateBio = async (id, bio) => {
  const updatedProfile = await prisma.profile.update({
    where: {
      id,
    },
    data: {
      bio,
    },
  });
  return updatedProfile;
};

const updatePicture = async (id, imageUrl) => {
  const updatedProfile = await prisma.profile.update({
    where: {
      id,
    },
    data: {
      imageUrl,
    },
  });
  return updatedProfile;
};

export default {
  findById,
  findByUserId,
  create,
  update,
  updateName,
  updateBio,
  updatePicture,
};
