import express, { Express } from "express";
import { PostModel } from "./posts/model";
import { PostModelImpl } from "./posts/model.impl";
import postgres from "postgres";

export type CreateServerOpts = {
    pool: postgres.Sql;
};

export function createServer(opts: CreateServerOpts): Express {
    const { pool } = opts;
    const app = express();

    // Middlewares
    app.use(express.json());

    // Models
    const postModel: PostModel = new PostModelImpl(pool);

    // Routes
    app.get('/', (request, response) => {
        response.send('Welcome!')
    });

    app.get('/posts', async (request, response) => {
        const posts = await postModel.getAll();
        response.json({ posts });
    });

    return app;
}