import "reflect-metadata";
import "./database"
import express from "express";
import { router } from "./routes";

const app = express()

app.use(router);

app.listen(4000, () => console.log("Server is running on port: 4000"));