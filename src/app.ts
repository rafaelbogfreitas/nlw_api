import "reflect-metadata";
import createConnection from "./database";
import express from "express";
import { router } from "./routes";
import { json } from "body-parser";

createConnection();
const app = express();

app.use(json());
app.use(router);

export { app };