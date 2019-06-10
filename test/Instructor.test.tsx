import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import { mount } from 'enzyme';
import * as React from 'react';
import fetchMock from 'fetch-mock';
import { ClassSearchResults } from '../src/public/js/ClassSearchResults';

describe('test instructor autocomplete', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('initial state of instructor', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('instructorName')).toEqual('');
  });

  it('should pass "All" as the instructorName props to ClassSearchResults component', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.setState({
      instructorName: 'All',
      isLoading: false,
    });
    classSearchContainerWrapper.find('button[type="submit"]').simulate('click');
    classSearchContainerWrapper.update();
    const classSearchResultsWrapper = classSearchContainerWrapper.debug();
    // console.log(classSearchResultsWrapper);
    // expect(classSearchResultsWrapper.prop('instructorName')).toEqual('All');
  });

});
