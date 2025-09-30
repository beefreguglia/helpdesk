import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Services Controller", () => {
	let user1_id: string | undefined;
	let service1_id: string | undefined;
	let service2_id: string | undefined;

	afterEach(async () => {
		if (user1_id) {
			await prisma.user.delete({ where: { id: user1_id } });
		}

		if (service1_id) {
			await prisma.service.delete({ where: { id: service1_id } });
		}

		if (service2_id) {
			await prisma.service.delete({ where: { id: service2_id } });
		}

		user1_id = undefined;
		service1_id = undefined;
		service2_id = undefined;
	});

	it("should be able to create a service", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "ADMIN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const response = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service", price: 100.5 });

		service1_id = response.body.service.id;

		expect(response.status).toBe(201);
		expect(response.body.service.title).toBe("Test service");
		expect(response.body.service.price).toBe("100.5");
	});

	it("should be able to list all services", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "ADMIN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const service1 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 1", price: 100.5 });

		service1_id = service1.body.service.id;

		const service2 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 2", price: 23.35 });

		service2_id = service2.body.service.id;

		const response = await request(app)
			.get("/services")
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.services).toHaveLength(2);
		expect(response.body.services[0].title).toBe("Test service 1");
	});

	it("should throw an error if the user logged is not an admin", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "TECHNICIAN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const response = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 1", price: 100.5 });

		expect(response.status).toBe(401);
		expect(response.body.message).toBe("Usuário não autorizado");
	});

	it("should be able to list all active services", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "ADMIN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const service1 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 1", price: 100.5 });

		service1_id = service1.body.service.id;

		const service2 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 2", price: 23.35 });

		await prisma.service.update({
			data: { isActive: false },
			where: { id: service2.body.service.id },
		});
		service2_id = service2.body.service.id;

		const response = await request(app)
			.get("/services/active")
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.services).toHaveLength(1);
		expect(response.body.services[0].title).toBe("Test service 1");
	});

	it("should be able to show a service by id", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "ADMIN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const service1 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 1", price: 100.5 });

		service1_id = service1.body.service.id;

		const response = await request(app)
			.get(`/services/${service1.body.service.id}`)
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.title).toBe("Test service 1");
		expect(response.body.price).toEqual("100.5");
	});

	it("should be able to active a service", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "ADMIN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const service1 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 1", price: 100.5 });

		service1_id = service1.body.service.id;

		await prisma.service.update({
			where: { id: service1_id },
			data: { isActive: false },
		});

		const response = await request(app)
			.patch(`/services/${service1_id}/active`)
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.service.isActive).toBe(true);
	});

	it("should be able to inactive a service", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "ADMIN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const service1 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 1", price: 100.5 });

		service1_id = service1.body.service.id;

		const response = await request(app)
			.patch(`/services/${service1_id}/inactive`)
			.auth(sessionResponse.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.service.isActive).toBe(false);
	});

	it("should be able to update a service", async () => {
		const user1 = await request(app).post("/users").send({
			email: "user1@example.com",
			name: "User One",
			password: "123456",
			role: "ADMIN",
		});
		user1_id = user1.body.id;

		const sessionResponse = await request(app).post("/sessions").send({
			email: `user1@example.com`,
			password: "123456",
		});

		const service1 = await request(app)
			.post("/services")
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Test service 1", price: 100.5 });

		service1_id = service1.body.service.id;

		const response = await request(app)
			.put(`/services/${service1_id}`)
			.auth(sessionResponse.body.token, { type: "bearer" })
			.send({ title: "Updated service 1", price: 150.5 });

		expect(response.status).toBe(200);
		expect(response.body.service.title).toBe("Updated service 1");
		expect(response.body.service.price).toBe("150.5");
	});
});
