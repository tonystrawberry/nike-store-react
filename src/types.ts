export type State = {
  selected: boolean,
  selectedProductId: number | null
}

export type Action = {
  type: string, 
  payload: any
}