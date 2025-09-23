import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

const TEST_EMAIL_SUFFIX = "@test.example.com";

describe("UsersController", () => {
	let user_id: string | undefined;
	let second_user_id: string | undefined;

	afterEach(async () => {
		if (user_id) {
			await prisma.user.delete({ where: { id: user_id } });
		}

		if (second_user_id) {
			await prisma.user.delete({ where: { id: second_user_id } });
		}

		user_id = undefined;
		second_user_id = undefined;
	});

	it("should create a new user successfully", async () => {
		const response = await request(app)
			.post("/users")
			.send({
				name: "Test user",
				email: `testuser${TEST_EMAIL_SUFFIX}`,
				password: "123456",
			});

		user_id = response.body.id;

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.name).toBe("Test user");
	});

	it("should throw an error if user with same email already exists in createUser", async () => {
		const user = await request(app)
			.post("/users")
			.send({
				name: "Duplicate user",
				email: `testuser${TEST_EMAIL_SUFFIX}`,
				password: "123456",
			});

		user_id = user.body.id;

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
				role: "ADMIN",
			});

		user_id = createdUserResponse.body.id;

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

	it("should throw a authorization error if user do not have permissions to edit an user", async () => {
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

		user_id = createdUserResponse.body.id;
		second_user_id = secondUser.body.id;

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

	it("should throw an error if user with same email already exists in editUser", async () => {
		const createdUserAdminResponse = await request(app)
			.post("/users")
			.send({
				name: "Admin User",
				email: `admin${TEST_EMAIL_SUFFIX}`,
				password: "123456",
				role: "ADMIN",
			});

		user_id = createdUserAdminResponse.body.id;

		const createdUserResponse = await request(app)
			.post("/users")
			.send({
				name: "User",
				email: `user${TEST_EMAIL_SUFFIX}`,
				password: "123456",
				role: "ADMIN",
			});

		second_user_id = createdUserResponse.body.id;

		const sessionResponse = await request(app)
			.post("/sessions")
			.send({
				email: `admin${TEST_EMAIL_SUFFIX}`,
				password: "123456",
			});

		const updatedUserResponse = await request(app)
			.put(`/users/${createdUserAdminResponse.body.id}`)
			.send({
				name: "Updated Admin User",
				email: `user${TEST_EMAIL_SUFFIX}`,
			})
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(updatedUserResponse.status).toBe(400);
		expect(updatedUserResponse.body.message).toBe(
			"Já existe um usuário cadastrado com esse e-mail",
		);
	});
});
