import postgres from "postgres";
import { createServer } from "./server";
import request from "supertest";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";

let postgresqlContainer: StartedPostgreSqlContainer;

beforeAll(async () => {
	postgresqlContainer = await new PostgreSqlContainer().start();
}, 10000);

beforeEach((done) => {
	done();
});

afterEach((done) => {
	done();
});

afterAll(async () => {
	await postgresqlContainer.stop();
});

test("GET /", async () => {
	const pool = postgres({
		"database": postgresqlContainer.getDatabase(),
		"host": postgresqlContainer.getHost(),
		"password": postgresqlContainer.getPassword(),
		"port": postgresqlContainer.getPort(),
		"username": postgresqlContainer.getUsername(),
	});
	const app = createServer({ pool });

	await request(app)
		.get("/")
		.expect(200)
		.then((response) => {
			expect(response.text).toBe("Welcome!");
		});
});

test("GET /posts", async () => {
	const pool = postgres({
		"database": postgresqlContainer.getDatabase(),
		"host": postgresqlContainer.getHost(),
		"password": postgresqlContainer.getPassword(),
		"port": postgresqlContainer.getPort(),
		"username": postgresqlContainer.getUsername(),
	});

	await pool`
	CREATE TABLE IF NOT EXISTS public.posts
	(
		id bigserial NOT NULL,
		author_id bigint,
		created_at date,
		text character varying NOT NULL,
		CONSTRAINT posts_pkey PRIMARY KEY (id)
	)
	`;

	await pool`
		INSERT INTO public.posts (author_id, created_at, text) VALUES (1, ${new Date().toISOString()}, 'post #1')
	`;
	await pool`
		INSERT INTO public.posts (author_id, created_at, text) VALUES (1, ${new Date().toISOString()}, 'post #2')
	`;

	const app = createServer({ pool });

	const response = await request(app).get("/posts");
	expect(response.status).toBe(200);
	expect(response.body?.posts.length).toBe(2);
});
