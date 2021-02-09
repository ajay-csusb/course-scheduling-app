import { mount } from 'enzyme';
import * as React from 'react';
import { TestUtils } from '../TestUtils';
import { OpenClasses } from '../../src/public/js/OpenClasses';

// tslint:disable:max-line-length
describe('Open classes component', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  test('component snapshot', () => {
    const openClassesComponentWrapper = mount(<OpenClasses openClasses={false} onChangeOfOpenClasses={() => {}} />);
    expect(openClassesComponentWrapper).toMatchSnapshot();
  });

});
