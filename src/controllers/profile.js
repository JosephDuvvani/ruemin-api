import models from "../models/index.js";
import { body, validationResult } from "express-validator";
import { upload, uploadPicture } from "../storage/storage.js";

const validateNames = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ max: 30 })
    .withMessage("Firstname cannot be more than 30 characters")
    .custom((value) => {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(value)) {
        throw new Error("Firstname can only contain letters");
      }
      return true;
    }),
  body("lastname")
    .trim()
    .optional()
    .isLength({ max: 30 })
    .withMessage("Lastname cannot be more than 30 characters")
    .custom((value) => {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(value)) {
        throw new Error("Lastname can only contain letters");
      }
      return true;
    }),
];

const updateName = [
  validateNames,
  async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty())
      return res.status(400).json({ errors: results.errors });

    const { profileId } = req.params;
    const { firstname, lastname } = req.body;

    try {
      const profile = await models.Profile.updateName(
        profileId,
        firstname,
        lastname
      );
      const updated = {
        firstname: profile.firstname,
        lastname: profile.lastname,
      };

      return res.json({ updated });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating name",
        error: err,
      });
    }
  },
];

const updateBio = async (req, res) => {
  const { profileId } = req.params;
  const { bio } = req.body;

  if (!bio || bio.trim().length > 101)
    return res.status(400).json({
      error: { msg: "Bio with 101 characters at most, is required." },
    });

  try {
    const profile = await models.Profile.updateBio(profileId, bio);
    const updated = {
      bio: profile.bio,
    };

    return res.json({ updated });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating bio",
      error: err,
    });
  }
};

const updatePicture = [
  upload.single("file"),
  async (req, res) => {
    const { profileId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    try {
      const url = await uploadPicture(file, profileId);
      const profile = await models.Profile.updatePicture(profileId, url);
      const updated = {
        imageUrl: profile.imageUrl,
      };
      return res.json({ updated });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating profile picture",
        error: err,
      });
    }
  },
];

export { updateName, updateBio, updatePicture };
