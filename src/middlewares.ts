import { NextFunction, Request, Response } from "express"
import { market } from "./database"

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
  console.log("Hello World!")
}

export {
  checkProductId,
  checkProductName
}