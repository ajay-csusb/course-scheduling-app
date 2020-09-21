import { mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../../src/public/js/ClassSearchContainer';
import { CourseLevels } from '../../src/public/js/CourseLevels';
import { TestUtils } from '../TestUtils';
import { ICourseLevels } from '../../src/public/js/Class';

// tslint:disable:max-line-length
describe('Course level component', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });
  
  test('component snapshot', () => {
    const courseLevelsOptionsState: ICourseLevels = {
      1000: false,
      2000: false,
      3000: false,
      4000: false,
      5000: false,
      6000: false,
      7000: false,
    }
    const courseLevelComponentWrapper = mount(<CourseLevels
      courseLevelsOptions={courseLevelsOptionsState} 
      onChangeOfCourseLevelsOptions={() => {}}
      onKeyDown={() => {}} 
    />);
    expect(courseLevelComponentWrapper).toMatchSnapshot();
  });
});
