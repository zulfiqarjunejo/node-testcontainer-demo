import express, { Express } from "express";

export function createServer(): Express {
    const app = express();

    // Middlewares
    app.use(express.json());

    // Routes
    app.get('/', (request, response) => {
        response.send('Welcome!')
    });

    app.get('/posts', (request, response) => {
        response.json({
            posts: [
                {id: 1, text: "post #1"},
                {id: 2, text: "post #2"}
            ] 
        });
    });

    return app;
}