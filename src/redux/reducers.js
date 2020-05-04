import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
} from './constants';

const initialStateOverview = {
  selected: false,
  selectedProductId: null
}

export const selectProduct = (state=initialStateOverview, action={}) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return Object.assign({}, state, {selected: true, selectedProductId: action.payload})
    case UNSELECT_PRODUCT:
      return Object.assign({}, state, {selected: false, selectedProductId: null})
    default:
      return state
  }
}