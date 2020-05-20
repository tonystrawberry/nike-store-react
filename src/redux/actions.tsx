import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CHANGE_PROFILE_INPUT,
  AUTH_USER
} from './constants'

import { Product, AdminUser } from '../types'

export const selectProduct = (productId : string) => ({ type: SELECT_PRODUCT, payload: productId })
export const unselectProduct = () => ({ type: UNSELECT_PRODUCT, payload: null })
export const fetchProducts = () => ({ type: FETCH_PRODUCTS, payload: null })
export const fetchProductsSuccess = (products: Product[]) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: products })
export const fetchProductsError = () => ({ type: FETCH_PRODUCTS_ERROR, payload: null })
export const onChangeProfileInput = (key: string, value: string) => ({ type: CHANGE_PROFILE_INPUT, payload: { key, value } })
export const authUser = (user: AdminUser) => ({ type: AUTH_USER, payload: user})
