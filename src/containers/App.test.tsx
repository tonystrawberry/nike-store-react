import { shallow, mount } from 'enzyme';
import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let store;
var initialState = {
  selectProduct: {
    selected: false,
    selectedProductId: null,
    products: [],
    loading: false
  }
}
const mockStore = configureStore([]);

it ('expect to render App component on /', () => {
  store = mockStore(initialState);
  const wrapper = mount(
    <MemoryRouter initialEntries={["/"]}>
      <Provider store={store}><App /></Provider>
    </MemoryRouter>
    )
  expect(wrapper.find('header'));
})