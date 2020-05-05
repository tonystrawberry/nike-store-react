import { mount, shallow, ReactWrapper } from 'enzyme';
import ProductCard from './ProductCard';
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
  let wrapper = mount(<Provider store={store}><ProductCard new={true} /></Provider>);
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
  let wrapper = mount(<Provider store={store}><ProductCard new={true} /></Provider>);

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
  let wrapper = mount(<Provider store={store}><ProductCard new={true} /></Provider>);

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

  let wrapper : ReactWrapper <any, any>;

  const mapDocument : any = {};
  document.addEventListener = jest.fn((event, cb : {( target : object ): void}) => {
    mapDocument[event] = () => {
      cb({ target: wrapper.find(".outside").last().getDOMNode() })
    };
  });  

  const documentAddListener = jest.spyOn(document, 'addEventListener');

  let store = mockStore({});
  wrapper = mount(
    <div> 
      <Provider store={store}><ProductCard new={true} /></Provider>
      <div className="outside"></div>
    </div>
  );

  expect(documentAddListener).toBeCalled();

  mapDocument.mousedown()
})

it ('handle clicks inside the component', () => {
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

  let wrapper : ReactWrapper <any, any>;

  const mapDocument : any = {};
  document.addEventListener = jest.fn((event, cb : {( target : object ): void}) => {
    mapDocument[event] = () => {
      cb({ target: wrapper.find(".product-card__container").last().getDOMNode() })
    };
  });  

  const documentAddListener = jest.spyOn(document, 'addEventListener');

  let store = mockStore({});
  wrapper = mount(
    <div> 
      <Provider store={store}><ProductCard new={true} /></Provider>
      <div className="outside"></div>
    </div>
  );

  expect(documentAddListener).toBeCalled();

  mapDocument['mousedown']()
})

it ('should show new class on new = true props', () => {
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
  let wrapper = mount(<Provider store={store}><ProductCard new={true} /></Provider>);

  expect(wrapper.find('.new').length).toBe(1)
})

it ('should not show new class on new = false props', () => {
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
  let wrapper = mount(<Provider store={store}><ProductCard new={false} /></Provider>);

  expect(wrapper.find('.new').length).toBe(0)
})


