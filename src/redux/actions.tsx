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
  HIDE_TOAST,
  UPDATE_ADMIN_PRODUCTS,
  DELETE_ADMIN_PRODUCTS,
  UPDATE_SINGLE_ADMIN_PRODUCT,
  ADD_PRODUCT_TO_CART,
  INIT_PRODUCTS_CART,
  DELETE_PRODUCT_FROM_CART
} from './constants'

import { Product, AdminUser } from '../types'
import { Dispatch } from 'redux'

export const selectProduct = (productId : string) => ({ type: SELECT_PRODUCT, payload: productId })
export const unselectProduct = () => ({ type: UNSELECT_PRODUCT, payload: null })
export const fetchProducts = () => ({ type: FETCH_PRODUCTS, payload: null })
export const fetchProductsSuccess = (products: Product[]) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: products })
export const fetchProductsError = () => ({ type: FETCH_PRODUCTS_ERROR, payload: null })
export const onChangeProfileInput = (key: string, value: string) => ({ type: CHANGE_PROFILE_INPUT, payload: { key, value } })
export const authUser = (user: AdminUser) => ({ type: AUTH_USER, payload: user})
export const logout = () => ({ type: LOGOUT_USER, payload: null})
export const showToast = (id: number, type: string, message: string) => ({ type: SHOW_TOAST, payload: { type, message }})
export const hideToast = (id: number) => ({ type: HIDE_TOAST, payload: { id }})
export const updateAdminProducts = (products: Product[]) => ({ type: UPDATE_ADMIN_PRODUCTS, payload: products })
export const updateSingleAdminProduct = (product: Product) => ({ type: UPDATE_SINGLE_ADMIN_PRODUCT, payload: { product }})

export const deleteAdminProduct = (id: string) => ({ type: DELETE_ADMIN_PRODUCTS, payload: { id: id} })
export const addProductToCart = (id: string) => ({ type: ADD_PRODUCT_TO_CART, payload: { id: id }})
export const deleteProductFromCart = (id: string) => ({ type: DELETE_PRODUCT_FROM_CART, payload: { id: id }})
export const initProductsCart = () => ({ type: INIT_PRODUCTS_CART, payload: null})

let nextNotificationId = 0
export const showNotificationWithTimeout = (dispatch: Dispatch, type: string, text: string) => {
  const id = nextNotificationId++
  dispatch(showToast(id, type, text))

  setTimeout(() => {
    dispatch(hideToast(id))
  }, 5000)
}

export const fetchStoreProducts = (dispatch: Dispatch) => {
  dispatch(fetchProducts())
  fetch('/api/products')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.text()
    })
    .then((body: any) => {
      dispatch(fetchProductsSuccess(JSON.parse(body)))
    })
    .catch(error => {
      showNotificationWithTimeout(dispatch, 'error', 'Products fetch failed. Please refresh the page or login again.')
    });
}
