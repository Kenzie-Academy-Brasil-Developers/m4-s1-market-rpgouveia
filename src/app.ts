import express, { Application } from "express"
import { createProduct, deleteProduct, readProducts, retrieveProduct, updateProduct } from "./logics"
import { checkProductId, checkProductName } from "./middlewares"

const app: Application = express()
app.use(express.json())

app.post("/products", checkProductName, createProduct)
app.get("/products", readProducts)
app.get("/products/:id", checkProductId, retrieveProduct)
app.patch("/products/:id", checkProductId, checkProductName,updateProduct)
app.delete("/products/:id", checkProductId, deleteProduct)

const port: number = 3000
const runningMessage = `Server running on http://localhost:${port}`
app.listen(port, () => console.log(runningMessage))