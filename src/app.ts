import express, { Application } from "express"
import { createProduct, readProducts, readProductsById } from "./logics"

const app: Application = express()
app.use(express.json())

// Criar e adicionar os produtos ao mercado
app.post("/products", createProduct)

// Listar todos os produtos do mercado, sendo possível listar pela section
app.get("/products", readProducts)

// Listar um produto específico através do seu id
app.get("/products/:id", readProductsById)

// Fazer endpoint para PATCH e DELETE por id

const port: number = 3000
const runningMessage = `Server running on http://localhost:${port}`
app.listen(port, () => console.log(runningMessage))