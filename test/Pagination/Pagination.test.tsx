import { mount } from 'enzyme';
import * as React from 'react';
import Pagination from '../../src/public/js/Pagination';
import { TestUtils } from '../TestUtils';
// tslint:disable:max-line-length
describe('Pagination component', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  test('pagination component snapshot', () => {
    const paginationComponentWrapper = mount(
      <Pagination numberPages={10} onChangeOfPageNumber={() => {}} currentPage={1} />
    );
    expect(paginationComponentWrapper).toMatchSnapshot();
  });

  describe('when a pager is displayed', () => {
    const paginationComponentWrapper = mount(
      <Pagination numberPages={10} onChangeOfPageNumber={() => {}} currentPage={2} />
    );
    it('should display the correct number of pages', () => {
      expect(paginationComponentWrapper.find('.pagination li a')).toHaveLength(14);
    });

    it('should display the first and last page link', () => {
      expect(paginationComponentWrapper.find('.pagination').html()).toMatch(/First/);
      expect(paginationComponentWrapper.find('.pagination').html()).toMatch(/Last/);
    });

    it('should display the previous and next link', () => {
      expect(paginationComponentWrapper.find('.pagination').html()).toMatch(/Previous/);
      expect(paginationComponentWrapper.find('.pagination').html()).toMatch(/Next/);
    });

    it('should display the correct CSS class', () => {
      expect(paginationComponentWrapper.find('.pagination li a').at(3).html()).toMatch(/current page-number/);
    });

    describe('when we are on the first page', () => {
      it('should not display the previous link', () => {
        const paginationComponentWrapper = mount(
          <Pagination numberPages={10} onChangeOfPageNumber={() => {}} currentPage={1} />
        );
        expect(paginationComponentWrapper.find('.pagination').html()).not.toMatch(/Previous/);
      });
    });

    describe('when we are on the last page', () => {
      it('should not display the next link', () => {
        const paginationComponentWrapper = mount(
          <Pagination numberPages={10} onChangeOfPageNumber={() => {}} currentPage={10} />
        );
        expect(paginationComponentWrapper.find('.pagination').html()).not.toMatch(/Next/);
      });
    });
  });
});
