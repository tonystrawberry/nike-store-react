import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './constants';

import { State, Action } from '../types'

const initialStateOverview : State = {
  selected: false,
  selectedProductId: null,
  products: [],
  loading: false
}

export const selectProduct = (state: State = initialStateOverview, action: Action = {type: '', payload: null} ) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return Object.assign({}, state, {selected: true, selectedProductId: action.payload})
    case UNSELECT_PRODUCT:
      return Object.assign({}, state, {selected: false, selectedProductId: null})
    case FETCH_PRODUCTS:
      return {...state, loading: true}
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, products: action.payload, loading: false}
    case FETCH_PRODUCTS_ERROR:
      return {...state, loading: false}
    default:
      return state
  }
}