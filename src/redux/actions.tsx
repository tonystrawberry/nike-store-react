import { apiCall } from '../api/api'
import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
} from './constants'

export const selectProduct = (productId : number) => ({ type: SELECT_PRODUCT, payload: productId })
export const unselectProduct = () => ({ type: UNSELECT_PRODUCT, payload: null })
