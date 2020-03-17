import * as React from 'react';
import { ClassesCards } from '../src/public/js/ClassesCards';
import { classJson } from './ClassesJson';
import { mount } from 'enzyme';
import { TestUtils } from './TestUtils';
import { IClass } from '../src/public/js/Class';

describe('when a class results component is displayed', () => {
  it('should display the correct markup', () => {
    const classesCardsComponent: JSX.Element = (
      <ClassesCards
        classes={classJson}
        currentTerm={'0000'}
      />
    );
    const classResultsComponent = mount(classesCardsComponent);
    expect(classResultsComponent).toMatchSnapshot();
  });
});

describe('Session codes label and markup', () => {
  describe('when a class is on a regular schedule', () => {
    it('should not display the Session label', () => {
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={classJson}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent.html()).not.toContain('<span>Session </span>');
      expect(classResultsComponent).toMatchSnapshot();
    });
  });

  describe('when a class is on a summer schedule', () => {
    it('should display the Session label', () => {
      const summerClassJson: IClass = TestUtils.copyObject(classJson);
      summerClassJson.sessionCode = '6W1';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={summerClassJson}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent.html()).toContain('<span>Session </span>6 weeks 1');
      expect(classResultsComponent).toMatchSnapshot();
    });
  });
});
describe('when a class is a fully online', () => {
  let classResultsComponent = null;
  beforeAll(() => {
    const fullyOnlineClassJson: IClass = TestUtils.copyObject(classJson);
    fullyOnlineClassJson.instructionMode = 'FO';
    const classesCardsComponent: JSX.Element = (
      <ClassesCards
        classes={fullyOnlineClassJson}
        currentTerm={'0000'}
      />
    );
    classResultsComponent = mount(classesCardsComponent);
  });

  it('should append (AB 386) to the text Fully Online', () => {
    expect(classResultsComponent.html()).toContain('Fully Online (AB 386)');
  });
  it('should not display room number', () => {
    expect(classResultsComponent.html()).not.toContain('<span>Room </span>');
  });

  it('should not display the room number in the markup', () => {
    expect(classResultsComponent).toMatchSnapshot();
  });
});
