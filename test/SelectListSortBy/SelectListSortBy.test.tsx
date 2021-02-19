import { mount } from 'enzyme';
import * as React from 'react';
import { SelectListSortBy } from '../../src/public/js/SelectListSortBy';
import { TestUtils } from '../TestUtils';
// tslint:disable:max-line-length
describe('SelectListSortBy', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  test('snapshot', () => {
    const selectListSortByWrapper = mount(<SelectListSortBy sortBy='classNumber' onChangeOfSortBy={() => {}} />);
    expect(selectListSortByWrapper).toMatchSnapshot();
  });

});