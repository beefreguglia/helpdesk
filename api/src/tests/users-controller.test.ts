import request from "supertest";

import { app } from "@/app";
import { prisma } from "@/database/prisma";

const TEST_EMAIL_SUFFIX = "@test.example.com";

describe("UsersController", () => {
  const createdUserIds: string[] = [];

  afterAll(async () => {
    if (createdUserIds.length > 0) {
      await prisma.user.deleteMany({
        where: {
          id: {
            in: createdUserIds,
          },
        },
      });
    }
  });

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          endsWith: TEST_EMAIL_SUFFIX,
        },
      },
    });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Test user",
        email: `testuser${TEST_EMAIL_SUFFIX}`,
        password: "123456",
      });

    createdUserIds.push(response.body.id);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test user");
  });

  it("should throw an error if user with same email already exists", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Duplicate user",
        email: `testuser${TEST_EMAIL_SUFFIX}`,
        password: "123456",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Já existe um usuário cadastrado com esse e-mail",
    );
  });

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Test user",
      email: "invalid-email",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro de validação");
  });

  it("should update a user successfully", async () => {
    const createdUserResponse = await request(app)
      .post("/users")
      .send({
        name: "Admin User",
        email: `admin${TEST_EMAIL_SUFFIX}`,
        password: "123456",
      });

    createdUserIds.push(createdUserResponse.body.id);

    await prisma.user.update({
      data: {
        role: "ADMIN",
      },
      where: {
        id: createdUserResponse.body.id,
      },
    });

    const sessionResponse = await request(app)
      .post("/sessions")
      .send({
        email: `admin${TEST_EMAIL_SUFFIX}`,
        password: "123456",
      });

    const updatedUserResponse = await request(app)
      .put(`/users/${createdUserResponse.body.id}`)
      .send({
        name: "Updated Admin User",
      })
      .auth(sessionResponse.body.token, { type: "bearer" });

    expect(updatedUserResponse.status).toBe(200);
    expect(updatedUserResponse.body).toHaveProperty("id");
    expect(updatedUserResponse.body.name).toBe("Updated Admin User");
  });

  it("should throw a authorization error if user do not have permissions", async () => {
    const createdUserResponse = await request(app)
      .post("/users")
      .send({
        name: "Client User",
        email: `client${TEST_EMAIL_SUFFIX}`,
        password: "123456",
      });

    const secondUser = await request(app)
      .post("/users")
      .send({
        name: "Client 2 User",
        email: `client2${TEST_EMAIL_SUFFIX}`,
        password: "123456",
      });

    createdUserIds.push(createdUserResponse.body.id);
    createdUserIds.push(secondUser.body.id);

    const sessionResponse = await request(app)
      .post("/sessions")
      .send({
        email: `client${TEST_EMAIL_SUFFIX}`,
        password: "123456",
      });

    const updatedUserResponse = await request(app)
      .put(`/users/${secondUser.body.id}`)
      .send({
        name: "Updated User",
      })
      .auth(sessionResponse.body.token, { type: "bearer" });

    expect(updatedUserResponse.status).toBe(401);
    expect(updatedUserResponse.body.message).toBe("Usuário não autorizado");
  });
});
