import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './constants'

import { Product } from '../types'

export const selectProduct = (productId : number) => ({ type: SELECT_PRODUCT, payload: productId })
export const unselectProduct = () => ({ type: UNSELECT_PRODUCT, payload: null })
export const fetchProducts = () => ({ type: FETCH_PRODUCTS, payload: null })
export const fetchProductsSuccess = (products: Product[]) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: products })
export const fetchProductsError = () => ({ type: FETCH_PRODUCTS_ERROR, payload: null })
