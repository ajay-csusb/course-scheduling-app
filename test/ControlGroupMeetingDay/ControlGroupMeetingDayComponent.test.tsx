import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { TestUtils } from '../TestUtils';
// tslint:disable:max-line-length
describe('Meeting day component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('Given a class search form', () => {
    test('meeting day component snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      const meetingDayWrapper = classSearchContainerWrapper.find('.meeting-day');
      expect(meetingDayWrapper).toMatchSnapshot();
    });
  });
});
