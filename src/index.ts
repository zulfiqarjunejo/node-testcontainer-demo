import express from "express";

const app = express()
const port = 9002

app.get('/info', (request, response) => {
    response.send(`Server running on port: ${port} ...`)
})

app.get('/', (request, response) => {
    response.send('Welcome!')
})

app.listen(port, () => {
    console.log(`Server running on port: ${port} ...`)
})