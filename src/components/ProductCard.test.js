import { mount, shallow } from 'enzyme';
import ProductCard from '../components/ProductCard';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

const mockStore = configureStore([]);

beforeEach(() => {
  Object.defineProperty(document, 'querySelectorAll', {
    writable: true,
    value: jest.fn().mockImplementation(query => ([{
      offsetWidth: 400
    }])),
  })

  Object.defineProperty(document, 'querySelector', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      style: {
        height: 0
      }
    })),
  })

  Object.defineProperty(document, 'querySelector', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      style: {
        height: 0
      }
    })),
  })
})

it('should call removeEventListener in componentWillUnmount', () => {

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const documentRemoveListener = jest.spyOn(document, 'removeEventListener');
  const windowRemoveListener = jest.spyOn(window, 'removeEventListener');
  
  let store = mockStore({});
  let wrapper = mount(<ProductCard store={store}/>);
  wrapper.unmount(); // Calls for componentWillUnmount

  expect(documentRemoveListener).toBeCalled();
  expect(windowRemoveListener).toBeCalled();
});


it ('expect to render ProductCard component with matchMedia => true', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  let store = mockStore({});
  let wrapper = mount(<ProductCard store={store}/>);

  expect(toJson(wrapper)).toMatchSnapshot();
})

it ('expect to render ProductCard component with matchMedia => false', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  let store = mockStore({});
  let wrapper = mount(<Provider store={store}><ProductCard /></Provider>);

  expect(toJson(wrapper)).toMatchSnapshot();
})

it ('handle clicks outside the component', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });



  let store = mockStore({});
  const wrapper = mount(
    <div> 
      <Provider store={store}><ProductCard /></Provider>
      <div className="outside"></div>
    </div>
  );

  // const documentAddListener = jest.spyOn(document, 'addEventListener');
  // const windowAddListener = jest.spyOn(window, 'addEventListener');

  // expect(documentAddListener).toBeCalled();
  // expect(windowAddListener).toBeCalled();

  wrapper.find('.outside').last().simulate('mousedown');
})



