import { Request, Response } from "express"
import { market } from "./database"
import { iProduct } from "./interface"

let nextProductId = 1
let totalValue = 0

const createProduct = (request: Request, response: Response): Response => {
  const newProducts: iProduct[] = request.body
  newProducts.forEach((object: iProduct) => {
    object.id = nextProductId
    nextProductId++
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 365)
    object.expirationDate = expirationDate
    totalValue += object.price
    market.push(object)
  })
  return response.status(201).json({
    total: totalValue,
    marketProducts: market
  })
}

const readProducts = (request: Request, response: Response): Response => {
  return response.status(200).json({
    total: totalValue,
    marketProducts: market
  })
}

const retrieveProduct = (request: Request, response: Response): Response => {
  const index = response.locals.market.productIndex
  return response.status(200).json(market[index])
}

const updateProduct = (request: Request, response: Response): Response => {
  const index = response.locals.market.productIndex
  const updateProductData = request.body
  market[index] = {
    ...market[index],
    ...updateProductData
  }
  return response.json(market[index])
}

const deleteProduct = (request: Request, response: Response): Response => {
  const index = response.locals.market.productIndex
  totalValue -= market[index].price
  market.splice(index, 1)
  return response.status(204).send()
}

export {
  createProduct,
  readProducts,
  retrieveProduct,
  updateProduct,
  deleteProduct
}