import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './constants';

import { ProductOverviewState } from '../types'
import * as reducers from './productOverview';

describe('selectProduct', () => {

  const initialState: ProductOverviewState = {
    selected: false,
    selectedProductId: null,
    products: [],
    loading: false
  }

  const stateSelected: ProductOverviewState = {
    selected: true,
    selectedProductId: "1",
    products: [],
    loading: false
  }

  it('should return default state on null', () => {
    expect(reducers.productOverview()).toEqual(expect.objectContaining({
      selected: false,
      selectedProductId: null
    }))
  })

  it('should handle unknown action', () => {
    expect(reducers.productOverview(initialState, {
      type: 'UNKNOWN_ACTION', payload: null
    })).toEqual(expect.objectContaining({
      selected: false,
      selectedProductId: null
    }))
  })

  it('should handle SELECT_PRODUCT', () => {
    expect(reducers.productOverview(initialState, {
      type: SELECT_PRODUCT, payload: 1
    })).toEqual(expect.objectContaining({
      selected: true,
      selectedProductId: 1
    }))
  })

  it('should handle UNSELECT_PRODUCT', () => {
    expect(reducers.productOverview(stateSelected, {
      type: UNSELECT_PRODUCT, payload: null
    })).toEqual(expect.objectContaining({
      selected: false,
      selectedProductId: null
    }))
  })

  it('should handle FETCH_PRODUCTS', () => {
    expect(reducers.productOverview(stateSelected, {
      type: FETCH_PRODUCTS, payload: null
    })).toEqual(expect.objectContaining({
      loading: true
    }))
  })

  it('should handle FETCH_PRODUCTS_SUCCESS', () => {
    expect(reducers.productOverview(stateSelected, {
      type: FETCH_PRODUCTS_SUCCESS, payload: [{title: "Nike"}]
    })).toEqual(expect.objectContaining({
      loading: false,
      products: [{title: "Nike"}]
    }))
  })

  it('should handle FETCH_PRODUCTS_ERROR', () => {
    expect(reducers.productOverview(stateSelected, {
      type: FETCH_PRODUCTS_ERROR, payload: null
    })).toEqual(expect.objectContaining({
      loading: false,
      products: []
    }))
  })
})