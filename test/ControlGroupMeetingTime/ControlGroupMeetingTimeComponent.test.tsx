import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { TestUtils } from '../TestUtils';
// tslint:disable:max-line-length
describe('Meeting time component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('Given a class search form', () => {
    test('meeting time component snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      const meetingTimeWrapper = classSearchContainerWrapper.find('.meeting-time');
      expect(meetingTimeWrapper).toMatchSnapshot();
    });
  });
});
