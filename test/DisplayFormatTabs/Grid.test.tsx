import { mount } from 'enzyme';
import { classJson } from '../ClassesJson';
import { Grid } from '../../src/public/js/Grid';
import * as React from 'react';

describe('Grid', () => {
  test('height of grid if number of classes are less than 200', () => {
    const gridComponent = mount(<Grid classes={[classJson]}/>);
    expect(gridComponent.html()).toContain('height: 100%');
  });

  test('height of grid is the number of classes are more than 200', () => {
    const moreThan200Classes = Array(250).fill(classJson);
    const gridComponent = mount(<Grid classes={moreThan200Classes} />);
    expect(gridComponent.html()).toContain('height: 4000px');
  });

});
