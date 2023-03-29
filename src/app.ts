import express, { Application } from "express"
import { createProduct, readProducts, retrieveProduct } from "./logics"

const app: Application = express()
app.use(express.json())

app.post("/products", createProduct)
app.get("/products", readProducts)
app.get("/products/:id", retrieveProduct)

// Fazer endpoint para PATCH e DELETE por id

const port: number = 3000
const runningMessage = `Server running on http://localhost:${port}`
app.listen(port, () => console.log(runningMessage))