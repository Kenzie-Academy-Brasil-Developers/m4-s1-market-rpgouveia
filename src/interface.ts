interface iProduct {
  id: number
  name: string
  price: number
  weight: number
  section: "food" | "cleaning"
  exporationDate: Date
}

interface iCleaningProduct extends iProduct {}

interface iFoodProduct extends iProduct { calories: number }

export {
  iProduct,
  iCleaningProduct,
  iFoodProduct
}