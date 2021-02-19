import ExportToExcel from '../src/public/js/ExportToExcel';
import { classJson, classPDC } from './ClassesJson';
import { mount, ReactWrapper, shallow } from 'enzyme';
import * as React from 'react';
import fetchMock from 'fetch-mock';
import { TestUtils } from './TestUtils';

describe('Export to Excel component', () => {
  let classes;

  beforeAll(() => {
    TestUtils.ajax();
    classes = [classJson, classPDC];
  });

  test('snapshot', () => {
    const exportToExcelComponent = <ExportToExcel classes={classes} />
    expect(exportToExcelComponent).toMatchSnapshot();
  });

  test('fetch parameters', (done) => {
    const exportToExcelComponent = mount(<ExportToExcel classes={classes} />);
    exportToExcelComponent.find('#export-to-excel').simulate('click');
    const fetchOptions = fetchMock.lastOptions();
    expect(fetchOptions.body).toMatch(JSON.stringify(classes));
    done();
  });

  test('markup', () => {
    const exportToExcelComponent = shallow(<ExportToExcel classes={classes} />);
    expect(exportToExcelComponent.html()).toContain('export-to-excel');
    expect(exportToExcelComponent.html()).toContain('fa-file-download');
    expect(exportToExcelComponent.html()).toContain('Export to Excel');
  });

});
