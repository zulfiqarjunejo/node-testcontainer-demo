import { createServer } from "./server";

const app = createServer();

const port = 9002;
app.listen(port, () => {
    console.log(`Server running on port: ${port} ...`)
});