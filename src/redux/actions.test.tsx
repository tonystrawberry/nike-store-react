import * as actions from './actions';

import {
  SELECT_PRODUCT,
  UNSELECT_PRODUCT
} from './constants';


it ('should create an action to select product', () => {
  const productId = 1;
  const expectedAction = {
    type: SELECT_PRODUCT, payload: productId
  }
  expect(actions.selectProduct(productId)).toEqual(expectedAction);
})

it ('should create an action to unselect product', () => {
  const expectedAction = {
    type: UNSELECT_PRODUCT, payload: null
  }
  expect(actions.unselectProduct()).toEqual(expectedAction);
})