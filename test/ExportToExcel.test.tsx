import ExportToExcel from '../src/public/js/ExportToExcel';
import { classJson, classPDC } from './ClassesJson';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import fetchMock from 'fetch-mock';
import { TestUtils } from './TestUtils';

describe('Export to Excel component', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  test('snapshot', () => {
    const exportToExcelComponent = <ExportToExcel classes={[classJson, classPDC]} />
    expect(exportToExcelComponent).toMatchSnapshot();
  });

  test('fetch parameters', () => {
    const classes = [classJson, classPDC];
    const exportToExcelComponent = mount(<ExportToExcel classes={classes} />);
    exportToExcelComponent.find('#export-to-excel').simulate('click');
    const fetchOptions = fetchMock.lastOptions();
    expect(fetchOptions.body).toMatch(JSON.stringify(classes));
  });

});
