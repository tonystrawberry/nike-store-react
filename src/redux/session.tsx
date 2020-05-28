import { ADD_PRODUCT_TO_CART, INIT_PRODUCTS_CART, DELETE_PRODUCT_FROM_CART } from './constants'

import { SessionState, Action } from '../types'

const initialStateOverview : SessionState = {
  cart: {
    products: []
  }
}

export const session = (state: SessionState = initialStateOverview, action: Action = {type: '', payload: null} ) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:{
      let newState = Object.assign({}, state)
      let products = newState.cart.products.slice()
      const index = products.findIndex((product) => (product.id == action.payload.id))
      if (index == -1){
        let product = {id: action.payload.id}
        products.push(product)
        storeProductLocalStorage(product)
      }
      newState.cart.products = products
      return newState
    }
    case DELETE_PRODUCT_FROM_CART:{
      let newState = Object.assign({}, state)
      let products = newState.cart.products.slice()
      products = products.filter( product => (product.id !== action.payload.id))
      deleteProductLocalStorage(action.payload.id)
      newState.cart.products = products
      return { cart: { products: [] }}
    }
    case INIT_PRODUCTS_CART:{
      let products = getProductsLocalStorage()
      state.cart.products = products
      return state
    }
    default:
      return state
  }
}

let deleteProductLocalStorage = (id: string) => {
  let existing = localStorage.getItem('cart')
  let array = existing ? existing.split('##') : []
  array = array.filter(productString => (JSON.parse(productString).id !== id))
  localStorage.setItem('cart', array.join("##"))
}

let storeProductLocalStorage = (product: any) => {
  let existing = localStorage.getItem('cart')
  let array = existing ? existing.split('##') : []
  array.push(JSON.stringify(product))
  localStorage.setItem('cart', array.join("##"))
}

let getProductsLocalStorage = () => {
  let existing = localStorage.getItem('cart')
  if (!existing){
    return []
  } else {
    let productsString = existing.split('##')
    let products: object[]
    products = productsString.map((productString) => (JSON.parse(productString)))
    return products
  }
}