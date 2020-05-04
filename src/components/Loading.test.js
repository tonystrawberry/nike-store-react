import { shallow } from 'enzyme';
import React from 'react';
import Loading from './Loading';
import toJson from 'enzyme-to-json';

it ('expect to render Loading component', () => {
  expect(toJson(shallow(<Loading />))).toMatchSnapshot();
})
