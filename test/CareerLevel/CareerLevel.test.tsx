import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { CareerLevels } from '../../src/public/js/CareerLevels';
import { TestUtils } from '../TestUtils';
import { ICareerLevels } from '../../src/public/js/Class';
// tslint:disable:max-line-length
describe('Class number component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  test('parent snapshot', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    classSearchContainerWrapper.find('#additional-filters').simulate('click');
    expect(classSearchContainerWrapper).toMatchSnapshot();
  });

  test('component snapshot', () => {
    const careerLevelsOptionsState: ICareerLevels = {
      ugrd: false,
      pbac: false,
      exed: false,
    }
    const careerLevelsComponentWrapper = mount(<CareerLevels
      careerLevelOptions={careerLevelsOptionsState}
      onChangeOfCareerLevelOptions={() => {}}
      onKeyDown={() => {}}
    />);
    expect(careerLevelsComponentWrapper).toMatchSnapshot();
  });

});