import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Users", async () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()
  });

  const response = await request(app).post("users").send({
    name: "MockUser",
    email: "mockemail@mock.com"
  })
})