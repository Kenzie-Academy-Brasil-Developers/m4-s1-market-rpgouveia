import express, { Application } from "express"
import { createProduct, deleteProduct, readProducts, retrieveProduct } from "./logics"

const app: Application = express()
app.use(express.json())

app.post("/products", createProduct)
app.get("/products", readProducts)
app.get("/products/:id", retrieveProduct)
app.delete("/products/:id", deleteProduct)

// Fazer endpoint para PATCH por id

const port: number = 3000
const runningMessage = `Server running on http://localhost:${port}`
app.listen(port, () => console.log(runningMessage))