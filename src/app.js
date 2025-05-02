import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { configDotenv } from "dotenv";
import guardLogin from "./middleware/guardLogin.js";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.auth);
app.use("/users", guardLogin, routes.user);
app.use("/requests", guardLogin, routes.request);
app.use("/chats", guardLogin, routes.chat);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Now listening on port: ${PORT}`));
