import "reflect-metadata";
import "./database"
import express from "express";
import { router } from "./routes";
import { json } from "body-parser";

const app = express()

app.use(json());
app.use(router);

app.listen(4000, () => console.log("Server is running on port: 4000"));