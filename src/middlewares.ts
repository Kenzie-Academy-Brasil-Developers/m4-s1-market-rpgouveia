import { NextFunction, Request, Response } from "express"
import { market } from "./database"
import { iProduct } from "./interface"

const checkProductId = (request: Request, response: Response, next: NextFunction): Response | void => {
  const id = parseInt(request.params.id)
  const foundedIndex = market.findIndex(object => object.id === id)
  if (foundedIndex === -1) {
    return response.status(404).json({
      error: "Product not found"
    })
  }
  response.locals.market = {
    productId: id,
    productIndex: foundedIndex
  }
  return next()
}

const checkProductName = (request: Request, response: Response, next: NextFunction): Response | void => {
  const newProducts: iProduct[] = request.body
  const productNames = market.map(product => product.name)
  for (const product of newProducts) {
    if (productNames.includes(product.name)) {
      return response.status(409).json({
        error: "Product already registered"
      })
    }
    return next()
  }
}

export {
  checkProductId,
  checkProductName
}