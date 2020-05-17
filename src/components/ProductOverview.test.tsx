import { mount } from 'enzyme';
import ProductOverview from './ProductOverview';
import React from 'react';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';


const mockStore = configureStore([]);
const product = {
  _id: "12345",
  title: "Title",
  subtitle1: "sub1",
  subtitle2: "sub2",
  imageUrl: "img.jpg",
  price: 23443
}

it ('expect to render ProductOverview component', () => {
  let store = mockStore({});
  let wrapper = mount(<Provider store={store}><ProductOverview product={product}/></Provider>);

  expect(toJson(wrapper)).toMatchSnapshot();
})

it ('dispatch on .product-overview click', () => {
  let store = mockStore({});

  let wrapper = mount(
    <Provider store={store}>
      <ProductOverview product={product}/>
    </Provider>
  );
  let productOverview = wrapper.find('.product-overview');
  productOverview.simulate('click');
  expect(store.getActions().length).toBe(1);
  expect(store.getActions()).toEqual([{type: "SELECT_PRODUCT", payload: "12345"}])
})



