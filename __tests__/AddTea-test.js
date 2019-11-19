/**
 * @format
 */

import 'react-native';
import React from 'react';
import AddTea from '../AddTea';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { exportAllDeclaration } from '@babel/types';

it('should', () => {
  const wrapper = shallow(<AddTea />)
  expect(wrapper.validateInputs()).toEqual(false)
})