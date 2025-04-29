import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import models from "../models/index.js";
import { generateAccessToken } from "../utils/utils.js";

const validateSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 20 })
    .withMessage("Username must be 20 characters or less")
    .custom(async (value) => {
      const regex = /[<>:"/\\|?*]/;
      if (regex.test(value)) {
        throw new Error("Username cannot contain special characters");
      }
      const userExists = await models.User.exists(value);
      if (userExists) {
        throw new Error("Username already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters"),
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("Firstname is required")
    .custom((value) => {
      const regex = /[<>:"/\\|?*]/;
      if (regex.test(value)) {
        throw new Error("Firstname cannot contain special characters");
      }
      return true;
    }),
  body("lastname")
    .trim()
    .optional()
    .custom((value) => {
      const regex = /[<>:"/\\|?*]/;
      if (regex.test(value)) {
        throw new Error("Lastname cannot contain special characters");
      }
      return true;
    }),
];

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 20 })
    .withMessage("Invalid username or password")
    .custom(async (value) => {
      const regex = /[<>:"/\\|?*]/;
      if (regex.test(value)) {
        throw new Error("Invalid username or password");
      }
      const userExists = await models.User.exists(value);
      if (!userExists) {
        throw new Error("Invalid username or password");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Invalid username or password")
    .custom(async (value, { req }) => {
      const user = await models.User.find(req.body.username);
      if (user) {
        const match = await bcrypt.compare(value, user.password);
        if (!match) {
          throw new Error("Invalid username or password");
        }
        req.user = user;
        return true;
      }
    }),
];

const signUpPost = [
  validateSignUp,
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(422).json({
        errors: results.errors,
      });
    }
    const { username, password, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await models.User.create(username, hashedPassword);

      await models.Profile.create(user.id, firstname, lastname, "", {});

      const payload = {
        id: user.id,
        username: user.username,
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      await models.Token.create(refreshToken);

      return res.status(201).json({
        message: "User created successfully",
        accessToken,
        refreshToken,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error creating user",
        error: err,
      });
    }
  },
];

const loginPost = [
  validateLogin,
  async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      return res.status(422).json({
        errors: results.errors,
      });
    }

    const user = req.user;
    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    try {
      await models.Token.create(refreshToken);
    } catch (err) {
      res.status(500).json({
        message: "Error logging in",
        error: err,
      });
    }

    return res.json({
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  },
];

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(400).json({
      error: { msg: "Refresh token is required" },
    });
  }

  try {
    const exists = await models.Token.exists(refreshToken);

    if (!exists) {
      return res.status(400).json({
        error: { msg: "Invalid refresh token" },
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error checking if token exists",
      error: err,
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: { msg: "Error verifying token" },
      });
    }

    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });

    return res.status(201).json({ accessToken });
  });
};

export { signUpPost, loginPost, refreshToken };
