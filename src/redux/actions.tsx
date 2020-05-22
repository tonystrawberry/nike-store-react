import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CHANGE_PROFILE_INPUT,
  AUTH_USER,
  LOGOUT_USER,
  SHOW_TOAST,
  HIDE_TOAST
} from './constants'

import { Product, AdminUser } from '../types'

export const selectProduct = (productId : string) => ({ type: SELECT_PRODUCT, payload: productId })
export const unselectProduct = () => ({ type: UNSELECT_PRODUCT, payload: null })
export const fetchProducts = () => ({ type: FETCH_PRODUCTS, payload: null })
export const fetchProductsSuccess = (products: Product[]) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: products })
export const fetchProductsError = () => ({ type: FETCH_PRODUCTS_ERROR, payload: null })
export const onChangeProfileInput = (key: string, value: string) => ({ type: CHANGE_PROFILE_INPUT, payload: { key, value } })
export const authUser = (user: AdminUser) => ({ type: AUTH_USER, payload: user})
export const logout = () => ({ type: LOGOUT_USER, payload: null})
export const showToast = (type: string, message: string) => ({ type: SHOW_TOAST, payload: { type, message }})
export const hideToast = (id: number) => ({ type: HIDE_TOAST, payload: { id }})