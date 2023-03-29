import { Request, Response } from "express"
import { market } from "./database"
import { iProduct } from "./interface"

const createProduct = (request: Request, response: Response): Response => {
  const newProducts: iProduct[] = request.body
  newProducts.forEach((object: iProduct) => {
    market.push(object)
  })
  return response.status(201).json(market)
}

const readProducts = (request: Request, response: Response): Response => {
  return response.status(200).json(market)
}

const readProductsById = (request: Request, response: Response): Response => {
  const returnObject = {
    pathParam: request.params.id,
    queryParam: request.query.myQuery
  }
  return response.status(200).json(returnObject)
}

export {
  createProduct,
  readProducts,
  readProductsById
}