import request from "supertest";

import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Sessions Controller", () => {
	let user_id: string;

	afterAll(async () => {
		await prisma.user.delete({ where: { id: user_id } });
	});

	it("should be able to authenticate and get access token", async () => {
		const createdUserResponse = await request(app).post("/users").send({
			name: "Auth Test User",
			email: "authtestuser@example.com",
			password: "123456",
		});

		const sessionResponse = await request(app).post("/sessions").send({
			email: "authtestuser@example.com",
			password: "123456",
		});

		expect(sessionResponse.status).toBe(200);
		expect(sessionResponse.body.token).toEqual(expect.any(String));
		user_id = createdUserResponse.body.id;
	});

	it("should throw an error if user try to login with incorrect password", async () => {
		await request(app).post("/users").send({
			name: "Auth Password Test User",
			email: "authtestuser@example.com",
			password: "123456",
		});

		const sessionResponse = await request(app).post("/sessions").send({
			email: "authtestuser@example.com",
			password: "incorrect",
		});

		expect(sessionResponse.status).toBe(401);
		expect(sessionResponse.body.message).toBe("Email ou senha inválido");
	});

	it("should throw an error if user try to login with incorrect email", async () => {
		await request(app).post("/users").send({
			name: "Auth Password Test User",
			email: "authtestuser@example.com",
			password: "123456",
		});

		const sessionResponse = await request(app).post("/sessions").send({
			email: "incorrectEmail@example.com",
			password: "123456",
		});

		expect(sessionResponse.status).toBe(401);
		expect(sessionResponse.body.message).toBe("Email ou senha inválido");
	});
});
