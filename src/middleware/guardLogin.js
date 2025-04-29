import jwt from "jsonwebtoken";

const guardLogin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: { msg: "User not logged in" },
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: { msg: "Error verifying token" },
      });
    }

    req.user = user;
    next();
  });
};

export default guardLogin;
