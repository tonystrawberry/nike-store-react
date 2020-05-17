import { mount, shallow } from 'enzyme';
import React, { Suspense } from 'react';
import configureStore from 'redux-mock-store';
import ProductOverviewContainer from './ProductOverviewContainer';
import ProductOverview from '../components/ProductOverview';
import ProductCard from '../components/ProductCard';
import toJson from 'enzyme-to-json';

import { Provider } from 'react-redux';

var initialStateSelectedFalse = {
  selectProduct: {
    selected: false,
    selectedProductId: null,
    products: [],
    loading: false
  }
}

var initialStateSelectedTrue = {
  selectProduct: {
    selected: true,
    selectedProductId: 1,
    products: [],
    loading: false
  }
}

const mockStore = configureStore([]);
let wrapper;
let store;

beforeEach(() => {
})

it ('expect to render 6 ProductOverview components', () => {
  store = mockStore(initialStateSelectedFalse);
  wrapper = mount(<Provider store={store}><ProductOverviewContainer /></Provider>);

  expect(wrapper.find(ProductOverview).length).toEqual(0)
  expect(wrapper.find(ProductCard).length).toEqual(0)

})


it ('expect to render 1 ProductCartd component', async() => {
  store = mockStore(initialStateSelectedTrue);
  wrapper = mount(<Provider store={store}>
      <ProductOverviewContainer />
  </Provider>);

  expect(wrapper.find(ProductOverview).length).toEqual(0)
  expect(toJson(wrapper)).toMatchSnapshot()
})




