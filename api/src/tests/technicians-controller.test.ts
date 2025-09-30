import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Technicians Controller", () => {
	let user_id: string | undefined;
	let technician1_user_id: string | undefined;
	let technician1_id: string | undefined;
	let technician2_user_id: string | undefined;
	let technician2_id: string | undefined;

	afterEach(async () => {
		if (user_id) {
			await prisma.user.delete({ where: { id: user_id } });
		}

		if (technician1_id) {
			await prisma.technician.delete({ where: { id: technician1_id } });
		}

		if (technician1_user_id) {
			await prisma.user.delete({ where: { id: technician1_user_id } });
		}

		if (technician2_id) {
			await prisma.technician.delete({ where: { id: technician2_id } });
		}

		if (technician2_user_id) {
			await prisma.user.delete({ where: { id: technician2_user_id } });
		}

		user_id = undefined;
		technician1_id = undefined;
		technician1_user_id = undefined;
		technician2_id = undefined;
		technician2_user_id = undefined;
	});

	it("should create a new technician successfully", async () => {
		const userAdmin = await request(app).post("/users").send({
			name: "Admin user",
			email: "admin@test.com",
			password: "123456",
			role: "ADMIN",
		});

		user_id = userAdmin.body.id;

		const session = await request(app).post("/sessions").send({
			email: "admin@test.com",
			password: "123456",
		});

		const technician = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user",
				email: `technician@test.com`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		technician1_id = technician.body.technician.id;
		technician1_user_id = technician.body.technician.userId;

		expect(technician.status).toBe(201);
		expect(technician.body.technician).toHaveProperty("id");
	});

	it("should throw an error if user with same email already exists in create technician", async () => {
		const userAdmin = await request(app).post("/users").send({
			name: "Admin user",
			email: "admin@test.com",
			password: "123456",
			role: "ADMIN",
		});

		user_id = userAdmin.body.id;

		const session = await request(app).post("/sessions").send({
			email: "admin@test.com",
			password: "123456",
		});

		const technician = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user",
				email: `technician@test.com`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		technician1_id = technician.body.technician.id;
		technician1_user_id = technician.body.technician.userId;

		const response = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user",
				email: `technician@test.com`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			"Já existe um usuário cadastrado com esse e-mail",
		);
	});

	it("should throw a validation error if email is invalid", async () => {
		const userAdmin = await request(app).post("/users").send({
			name: "Admin user",
			email: "admin@test.com",
			password: "123456",
			role: "ADMIN",
		});

		user_id = userAdmin.body.id;

		const session = await request(app).post("/sessions").send({
			email: "admin@test.com",
			password: "123456",
		});

		const response = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user",
				email: `invalid`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		expect(response.status).toBe(400);
		expect(response.body.message).toBe("Erro de validação");
	});

	it("should be able to list technicians", async () => {
		const userAdmin = await request(app).post("/users").send({
			name: "Admin user",
			email: "admin@test.com",
			password: "123456",
			role: "ADMIN",
		});

		user_id = userAdmin.body.id;

		const session = await request(app).post("/sessions").send({
			email: "admin@test.com",
			password: "123456",
		});

		const technician1 = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user 1",
				email: `technician1@test.com`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		technician1_id = technician1.body.technician.id;
		technician1_user_id = technician1.body.technician.userId;

		const technician2 = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user 2",
				email: `technician2@test.com`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		technician2_id = technician2.body.technician.id;
		technician2_user_id = technician2.body.technician.userId;

		const response = await request(app)
			.get("/technicians")
			.auth(session.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.technicians).toHaveLength(2);
		expect(response.body.technicians[0].name).toBe("Technician user 2");
	});

	it("should be able to show a technician by user id", async () => {
		const userAdmin = await request(app).post("/users").send({
			name: "Admin user",
			email: "admin@test.com",
			password: "123456",
			role: "ADMIN",
		});

		user_id = userAdmin.body.id;

		const session = await request(app).post("/sessions").send({
			email: "admin@test.com",
			password: "123456",
		});

		const technician1 = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user 1",
				email: `technician1@test.com`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		technician1_id = technician1.body.technician.id;
		technician1_user_id = technician1.body.technician.userId;

		const response = await request(app)
			.get(`/technicians/${technician1_user_id}`)
			.auth(session.body.token, { type: "bearer" });

		expect(response.status).toBe(200);
		expect(response.body.name).toBe("Technician user 1");
		expect(response.body.email).toBe("technician1@test.com");
	});

	it("should throw an error if the technician does not exist", async () => {
		const userAdmin = await request(app).post("/users").send({
			name: "Admin user",
			email: "admin@test.com",
			password: "123456",
			role: "ADMIN",
		});

		user_id = userAdmin.body.id;

		const session = await request(app).post("/sessions").send({
			email: "admin@test.com",
			password: "123456",
		});

		const response = await request(app)
			.get(`/technicians/${userAdmin.body.id}`)
			.auth(session.body.token, { type: "bearer" });

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Técnico não encontrado");
	});

	it("should be able to update a client", async () => {
		const userAdmin = await request(app).post("/users").send({
			name: "Admin user",
			email: "admin@test.com",
			password: "123456",
			role: "ADMIN",
		});

		user_id = userAdmin.body.id;

		const session = await request(app).post("/sessions").send({
			email: "admin@test.com",
			password: "123456",
		});

		const technician1 = await request(app)
			.post("/technicians")
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Technician user 1",
				email: `technician1@test.com`,
				password: "123456",
				availability: ["10:00", "12:00", "14:00"],
			});

		technician1_id = technician1.body.technician.id;
		technician1_user_id = technician1.body.technician.userId;

		const response = await request(app)
			.put(`/technicians/${technician1_user_id}`)
			.auth(session.body.token, { type: "bearer" })
			.send({
				name: "Updated Technician",
			});

		expect(response.status).toBe(200);
		expect(response.body.technician.user.name).toBe("Updated Technician");
	});
});
