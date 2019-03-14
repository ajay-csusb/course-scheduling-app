import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { ClassSearchContainer } from '../src/public/js/ClassSearchContainer';
import fetchMock from 'fetch-mock';
import { RadioGroupInstructionMode } from '../src/public/js/RadioGroupInstructionMode';
// tslint:disable:max-line-length
describe('test radio group instruction mode component', () => {

  beforeAll(() => {
    fetchMock.mock('*', {});
  });

  test('state when campus are changed', () => {
    const classSearchContainerWrapper = mount(<ClassSearchContainer />);
    expect(classSearchContainerWrapper.state('instructionMode')).toEqual('all');
    classSearchContainerWrapper.find('.classroom > input').simulate('change', { target: { value: 'classroom' } });
    expect(classSearchContainerWrapper.state('instructionMode')).toEqual('classroom');
    classSearchContainerWrapper.find('.online > input').simulate('change', { target: { value: 'online' } });
    expect(classSearchContainerWrapper.state('instructionMode')).toEqual('online');
  });

  test('snapshot', () => {
    const onChangeOfInstructionMode = jest.fn();
    const radioGroupInstructionMode = mount(<RadioGroupInstructionMode instructionMode="both" onChangeOfInstructionMode={onChangeOfInstructionMode} />);
    expect(radioGroupInstructionMode).toMatchSnapshot();
  });

});
