import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Clients Controller", () => {
	let user1_id: string | undefined;
	let user2_id: string | undefined;
	let user3_id: string | undefined;

	afterEach(async () => {
		if (user1_id) {
			await prisma.user.delete({ where: { id: user1_id } });
		}

		if (user2_id) {
			await prisma.user.delete({ where: { id: user2_id } });
		}

		if (user3_id) {
			await prisma.user.delete({ where: { id: user3_id } });
		}

		user1_id = undefined;
		user2_id = undefined;
		user3_id = undefined;
	});

	it("should be able to list clients", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
		});
		user1_id = user1.body.id;

		const user2 = await request(app).post("/users").send({
			email: "user2@example.com",
			name: "User Two",
			password: "123456",
		});
		user2_id = user2.body.id;

		const user3 = await request(app).post("/users").send({
			email: "user3@example.com",
			name: "User Three",
			password: "123456",
			role: "ADMIN",
		});
		user3_id = user3.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user3@example.com`,
			password: "123456",
		});

		const response = await request(app)
			.get("/clients")
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.clients).toHaveLength(2);
		expect(response.body.clients[0].name).toBe("User Two");
	});

	it("should be able to show a client", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
		});
		user1_id = user1.body.id;

		const user2 = await request(app).post("/users").send({
			email: "user2@example.com",
			name: "User Two",
			password: "123456",
			role: "ADMIN",
		});
		user2_id = user2.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user2@example.com`,
			password: "123456",
		});

		const response = await request(app)
			.get(`/clients/${user1_id}`)
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.name).toBe("User One");
		expect(response.body.email).toBe("user1@example.com");
	});

	it("should be able to update a client", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
		});
		user1_id = user1.body.id;

		const user2 = await request(app).post("/users").send({
			email: "user2@example.com",
			name: "User Two",
			password: "123456",
			role: "ADMIN",
		});
		user2_id = user2.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user2@example.com`,
			password: "123456",
		});

		const response = await request(app)
			.put(`/clients/${user1_id}`)
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({
				name: "Updated User One",
				email: "updateduser1@example.com",
			});

		const updatedUser = await request(app)
			.get(`/clients/${user1_id}`)
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(204);
		expect(updatedUser.body.name).toBe("Updated User One");
		expect(updatedUser.body.email).toBe("updateduser1@example.com");
	});

	it("should be able to delete a client", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
		});

		const user2 = await request(app).post("/users").send({
			email: "user2@example.com",
			name: "User Two",
			password: "123456",
			role: "ADMIN",
		});
		user2_id = user2.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user2@example.com`,
			password: "123456",
		});

		const response = await request(app)
			.delete(`/clients/${user1.body.id}`)
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({
				name: "Updated User One",
				email: "updateduser1@example.com",
			});

		expect(response.status).toBe(204);
	});

	it("should throw an error if the client try delete other client", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
		});
		user1_id = user1.body.id;

		const user2 = await request(app).post("/users").send({
			email: "user2@example.com",
			name: "User Two",
			password: "123456",
		});
		user2_id = user2.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user2@example.com`,
			password: "123456",
		});

		const response = await request(app)
			.delete(`/clients/${user1.body.id}`)
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({
				name: "Updated User One",
				email: "updateduser1@example.com",
			});

		expect(response.status).toBe(401);
		expect(response.body.message).toBe("Usuário não autorizado");
	});
});
