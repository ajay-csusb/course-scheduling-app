import { mount } from 'enzyme';
import * as React from 'react';
import { CareerLevels } from '../../src/public/js/CareerLevels';
import { TestUtils } from '../TestUtils';
import { ICareerLevels } from '../../src/public/js/Class';
// tslint:disable:max-line-length
describe('Career levels component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  test('component snapshot', () => {
    const careerLevelsOptionsState: ICareerLevels = {
      ugrd: false,
      pbac: false,
      exed: false,
    }
    const careerLevelsComponentWrapper = mount(<CareerLevels
      careerLevelsOptions={careerLevelsOptionsState}
      onChangeOfCareerLevelsOptions={() => {}}
      onKeyDown={() => {}}
    />);
    expect(careerLevelsComponentWrapper).toMatchSnapshot();
  });

});