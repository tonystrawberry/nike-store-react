import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './constants';

import { State } from '../types'
import * as reducers from './reducers';

describe('selectProduct', () => {

  const initialState: State = {
    selected: false,
    selectedProductId: null,
    products: [],
    loading: false
  }

  const stateSelected: State = {
    selected: true,
    selectedProductId: 1,
    products: [],
    loading: false
  }

  it('should return default state on null', () => {
    expect(reducers.selectProduct()).toEqual(expect.objectContaining({
      selected: false,
      selectedProductId: null
    }))
  })

  it('should handle unknown action', () => {
    expect(reducers.selectProduct(initialState, {
      type: 'UNKNOWN_ACTION', payload: null
    })).toEqual(expect.objectContaining({
      selected: false,
      selectedProductId: null
    }))
  })

  it('should handle SELECT_PRODUCT', () => {
    expect(reducers.selectProduct(initialState, {
      type: SELECT_PRODUCT, payload: 1
    })).toEqual(expect.objectContaining({
      selected: true,
      selectedProductId: 1
    }))
  })

  it('should handle UNSELECT_PRODUCT', () => {
    expect(reducers.selectProduct(stateSelected, {
      type: UNSELECT_PRODUCT, payload: null
    })).toEqual(expect.objectContaining({
      selected: false,
      selectedProductId: null
    }))
  })

  it('should handle FETCH_PRODUCTS', () => {
    expect(reducers.selectProduct(stateSelected, {
      type: FETCH_PRODUCTS, payload: null
    })).toEqual(expect.objectContaining({
      loading: true
    }))
  })

  it('should handle FETCH_PRODUCTS_SUCCESS', () => {
    expect(reducers.selectProduct(stateSelected, {
      type: FETCH_PRODUCTS_SUCCESS, payload: [{title: "Nike"}]
    })).toEqual(expect.objectContaining({
      loading: false,
      products: [{title: "Nike"}]
    }))
  })

  it('should handle FETCH_PRODUCTS_ERROR', () => {
    expect(reducers.selectProduct(stateSelected, {
      type: FETCH_PRODUCTS_ERROR, payload: null
    })).toEqual(expect.objectContaining({
      loading: false,
      products: []
    }))
  })
})