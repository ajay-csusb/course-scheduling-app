import { mount } from 'enzyme';
import * as React from 'react';
import SelectListResultsOptions from '../../src/public/js/SelectListResultsOptions';
import { TestUtils } from '../TestUtils';

describe('SelectListResultsOptions component', () => {
  test('SelectListResultsOptions component snapshot', () => {
    const selectListResultsOptionsComponent = mount(<SelectListResultsOptions limit={30} onChangeOfLimit={() => { }} />);
    expect(selectListResultsOptionsComponent).toMatchSnapshot();
  });

});
