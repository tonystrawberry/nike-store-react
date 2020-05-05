import { shallow } from 'enzyme';
import React from 'react';
import Header from './Header';
import toJson from 'enzyme-to-json';

it ('expect to render Header component', () => {
  expect(toJson(shallow(<Header />))).toMatchSnapshot();
})
