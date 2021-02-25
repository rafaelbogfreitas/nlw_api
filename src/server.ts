import "reflect-metadata";
import "./database"
import express from "express";

const app = express()

app.get("/", (req, res) => {
  return res.json({
    message: "RAFAEL"
  })
});

app.post("/", (req, res) => {
  return res.json({
    message: "Data saved successfully"
  })
})

app.listen(4000, () => console.log("Server is running on port: 4000"));