import postgres from "postgres";
import { createServer } from "./server";

const pool = postgres({
    "database": "nnt_demo", // TODO: use environment variables
    "host": "postgres",
    "password": "demo",
    "user": "demo",
});

const app = createServer({ pool });

const port = 9002;
app.listen(port, () => {
    console.log(`Server running on port: ${port} ...`);
});