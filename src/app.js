import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.auth, routes.user);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Now listening on port: ${PORT}`));
