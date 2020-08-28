import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { TestUtils } from '../TestUtils';
import { OpenClasses } from '../../src/public/js/OpenClasses';

// tslint:disable:max-line-length
describe('Open classes component', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  test('parent snapshot', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    expect(classSearchContainerWrapper).toMatchSnapshot();
  });

  test('component snapshot', () => {
    const openClassesComponentWrapper = mount(<OpenClasses openClasses={false} onChangeOfOpenClasses={() => {}} />);
    expect(openClassesComponentWrapper).toMatchSnapshot();
  });

  test('status box text', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    expect(classSearchContainerWrapper.text()).toContain('Off');
    classSearchContainerWrapper.find('.open-classes > input').simulate('change');
    expect(classSearchContainerWrapper.text()).toContain('On');
  });
});
