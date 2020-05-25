import React from 'react';
import {configure, shallow} from 'enzyme';
import Title from 'components/base/Title';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Title component', () => {
  const wrapper = shallow(<Title>title</Title>);

  describe('about render', () => {
    it('compare with snapshot', () => {
      expect(wrapper.getElements()).toMatchSnapshot();
    });
  })
});