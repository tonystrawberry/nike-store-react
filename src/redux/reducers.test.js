import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
} from './constants';

import * as reducers from './reducers';

describe('selectProduct', () => {

  const initialState = {
    selected: false,
    selectedProductId: null
  }

  const stateSelected = {
    selected: true,
    selectedProductId: 1
  }

  it ('should return the initial state', () => {
    expect(reducers.selectProduct(undefined, {})).toEqual({
      selected: false,
      selectedProductId: null
    })
  })

  it('should handle SELECT_PRODUCT', () => {
    expect(reducers.selectProduct(initialState, {
      type: SELECT_PRODUCT, payload: 1
    })).toEqual({
      selected: true,
      selectedProductId: 1
    })
  })

  it('should handle UNSELECT_PRODUCT', () => {
    expect(reducers.selectProduct(stateSelected, {
      type: UNSELECT_PRODUCT, payload: null
    })).toEqual({
      selected: false,
      selectedProductId: null
    })
  })
})