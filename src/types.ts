export type State = {
  selected: boolean,
  selectedProductId: number | null,
  products: Product[],
  loading: boolean
}

export type Action = {
  type: string, 
  payload: any
}

export type Product = {
  _id: string,
  title: string,
  subtitle1: string,
  subtitle2: string,
  imageUrl: string,
  price: number
}