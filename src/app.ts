import express, { Application, Request, Response } from "express"

const app: Application = express()
app.use(express.json())

// Criar e adicionar os produtos ao mercado
app.post("/products", (request: Request, response: Response): Response => {
  return response.status(201).json(request.body)
})

// Listar todos os produtos do mercado, sendo possível listar pela section
app.get("/products", (request: Request, response: Response): Response => {
  return response.status(200).json({status: "OK"})
})

// Listar um produto específico através do seu id
app.get("/products/:id", (request: Request, response: Response): Response => {
  const returnObject = {
    pathParam: request.params.id,
    queryParam: request.query.myQuery
  }
  return response.status(200).json(returnObject)
})

// Fazer endpoint para PATCH e DELETE por id

const port: number = 3000
const runningMessage = `Server running on http://localhost:${port}`
app.listen(port, () => console.log(runningMessage))