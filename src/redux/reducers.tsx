import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
} from './constants';

import { State, Action } from '../types'

const initialStateOverview : State = {
  selected: false,
  selectedProductId: null
}

export const selectProduct = (state: State = initialStateOverview, action: Action = {type: '', payload: null} ) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return Object.assign({}, state, {selected: true, selectedProductId: action.payload})
    case UNSELECT_PRODUCT:
      return Object.assign({}, state, {selected: false, selectedProductId: null})
    default:
      return state
  }
}