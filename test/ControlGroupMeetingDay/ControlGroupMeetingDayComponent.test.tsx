import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
// tslint:disable:max-line-length
describe('Meeting day component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  describe('Given a class search form', () => {

    test('meeting day component snapshot', () => {
      const classSearchContainerWrapper = mount(<ClassSearchContainer />);
      const meetingDayWrapper = classSearchContainerWrapper.find('.meeting-day');
      expect(meetingDayWrapper).toMatchSnapshot();
    });
  });
});
