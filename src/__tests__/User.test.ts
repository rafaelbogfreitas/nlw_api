import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";

describe("Users", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "MockUser",
      email: "mockemail@mock.com"
    });

    expect(response.status).toBe(200);
  });

  it("Should not be able to create a user when it already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "MockUser",
      email: "mockemail@mock.com"
    });

    expect(response.status).toBe(400);
  });
});