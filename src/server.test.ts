import { createServer } from "./server";
import request from "supertest";

beforeEach((done) => {
	done();
});

afterEach((done) => {
	done();
});

const app = createServer();

test("GET /", async () => {
	await request(app)
		.get("/")
		.expect(200)
		.then((response) => {
			expect(response.text).toBe("Welcome!");
		});
});

test("GET /posts", async () => {
	const response = await request(app).get("/posts");
	expect(response.status).toBe(200);
	expect(response.body?.posts.length).toBe(3);
});
