import { shallow } from 'enzyme';
import React from 'react';
import App from './App';
import toJson from 'enzyme-to-json';

it ('expect to render App component', () => {
  expect(toJson(shallow(<App />))).toMatchSnapshot();
})