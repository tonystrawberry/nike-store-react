import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
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
})