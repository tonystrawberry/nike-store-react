import { mount, shallow } from 'enzyme';
import ProductOverview from './ProductOverview';
import React, { Suspense } from 'react';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';


const mockStore = configureStore([]);

it ('expect to render ProductOverview component', () => {
  let store = mockStore({});
  let wrapper = mount(<Provider store={store}><ProductOverview /></Provider>);

  expect(toJson(wrapper)).toMatchSnapshot();
})

it ('dispatch on .product-overview click', () => {
  let store = mockStore({});

  let wrapper = mount(
    <Provider store={store}>
      <ProductOverview />
    </Provider>
  );
  let productOverview = wrapper.find('.product-overview');
  productOverview.simulate('click');
  expect(store.getActions().length).toBe(1);
  expect(store.getActions()).toEqual([{type: "SELECT_PRODUCT", payload: 1}])
})



