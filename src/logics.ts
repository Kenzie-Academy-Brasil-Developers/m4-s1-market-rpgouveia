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
  const id = parseInt(request.params.id)
  const foundedIndex = market.findIndex(object => object.id === id)
  if (foundedIndex === -1) {
    return response.status(404).json({
      error: "Product not found"
    })
  }
  return response.status(200).json(market[foundedIndex])
}

const deleteProduct = (request: Request, response: Response): Response => {
  const id = parseInt(request.params.id)
  const foundedIndex = market.findIndex(object => object.id === id)
  if (foundedIndex === -1) {
    return response.status(404).json({
      error: "Product not found"
    })
  }
  totalValue -= market[foundedIndex].price
  market.splice(foundedIndex, 1)
  return response.status(204).send()
}

export {
  createProduct,
  readProducts,
  retrieveProduct,
  deleteProduct
}