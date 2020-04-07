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
      expect(classResultsComponent.html()).toContain('<span>Session </span>6 Week 1');
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

describe('when a class has zero cost course material', () => {
  it('should display icon for zero cost course material', () => {
    const zeroCostClassJson: IClass = TestUtils.copyObject(classJson);
    zeroCostClassJson.courseAttr = 'Zero Cost Course Materials';
    const classesCardsComponent: JSX.Element = (
      <ClassesCards
        classes={zeroCostClassJson}
        currentTerm={'0000'}
      />
    );
    const classResultsComponent = mount(classesCardsComponent);
    expect(classResultsComponent.html())
      .toContain('https://www.csusb.edu/sites/default/files/zero-cost-book-icon-big.png');
    expect(classResultsComponent).toMatchSnapshot();
  });
});
describe('when a class has low cost course material', () => {
  it('should display icon for low cost course material', () => {
    const lowCostClassJson: IClass = TestUtils.copyObject(classJson);
    lowCostClassJson.courseAttr = 'Low Cost Course Materials, GE1-FOO';
    const classesCardsComponent: JSX.Element = (
      <ClassesCards
        classes={lowCostClassJson}
        currentTerm={'0000'}
      />
    );
    const classResultsComponent = mount(classesCardsComponent);
    expect(classResultsComponent.html())
      .toContain('https://www.csusb.edu/sites/default/files/low-cost-book-icon-big.png');
    expect(classResultsComponent).toMatchSnapshot();
  });
});
describe('when a class has zero cost course materials and low cost course materials', () => {
  it('should display icons for ZCCM and LCCM', () => {
    const courseIconsJson: IClass = TestUtils.copyObject(classJson);
    courseIconsJson.courseAttr = 'Zero Cost Course Materials, Low Cost Course Materials';
    const classesCardsComponent: JSX.Element = (
      <ClassesCards
        classes={courseIconsJson}
        currentTerm={'0000'}
      />
    );
    const classResultsComponent = mount(classesCardsComponent);
    expect(classResultsComponent).toMatchSnapshot();
  });
});

describe('building code and room number', () => {
  describe('when a class has building code as OL', () => {
    it('should not display the building code', () => {
      const buildingCodeOlClassJson: IClass = TestUtils.copyObject(classJson);
      buildingCodeOlClassJson.buildingCode = 'OL';
      buildingCodeOlClassJson.room = 'ONLINE';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={buildingCodeOlClassJson}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent).toMatchSnapshot();
      expect(classResultsComponent.html()).toContain('<li><span>Room </span>Online</li>');
    });
  });

  describe('when a class does not have a building code and room number', () => {
    it('should display TBD', () => {
      const noRoomClassJson: IClass = TestUtils.copyObject(classJson);
      noRoomClassJson.buildingCode = '';
      noRoomClassJson.room = '';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={noRoomClassJson}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent).toMatchSnapshot();
      expect(classResultsComponent.html()).toContain('<li><span>Room </span>TBD</li>');
    });
  });

  describe('when a class has a building code and room number', () => {
    it('should display it in the correct format', () => {
      const classWithRoom: IClass = TestUtils.copyObject(classJson);
      classWithRoom.buildingCode = 'foo';
      classWithRoom.room = '101';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={classWithRoom}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent).toMatchSnapshot();
      expect(classResultsComponent.html()).toContain('<li><span>Room </span>foo 101</li>');
    });
  });

  describe('when a class has a building code as TBD', () => {
    it('should display building code and room number as TBD', () => {
      const classWithBuildingCodeTbd: IClass = TestUtils.copyObject(classJson);
      classWithBuildingCodeTbd.buildingCode = 'TBD';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={classWithBuildingCodeTbd}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent).toMatchSnapshot();
      expect(classResultsComponent.html()).toContain('<li><span>Room </span>TBD</li>');
    });
  });
});

describe('seats text verbiage', () => {
  describe('when a class has seats available for enrollment', () => {
    it('should display the number of seats available and total number of seats', () => {
      const classWithAvailableSeats: IClass = TestUtils.copyObject(classJson);
      classWithAvailableSeats.enrolledTotal = 10;
      classWithAvailableSeats.enrolledCapacity = 30;
      classWithAvailableSeats.quarter = '9999';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={classWithAvailableSeats}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent).toMatchSnapshot();
      expect(classResultsComponent.html()).toContain('Seats Available: <span>20/30</span>');
    });
  });
  describe('when a class has seats available on the waitlist', () => {
    it('should display the number of students on waitlist and the total seats on waitlist', () => {
      const classWithStudentsOnWaitlist: IClass = TestUtils.copyObject(classJson);
      classWithStudentsOnWaitlist.enrolledTotal = 30;
      classWithStudentsOnWaitlist.enrolledCapacity = 30;
      classWithStudentsOnWaitlist.waitlistTotal = 25;
      classWithStudentsOnWaitlist.waitlistCapacity = 30;
      classWithStudentsOnWaitlist.quarter = '9999';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={classWithStudentsOnWaitlist}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent).toMatchSnapshot();
      expect(classResultsComponent.html()).toContain('Waitlist: <span>25/30</span>');
    });
  });
  describe('when a class has no waitlist', () => {
    // @Todo delete this
    it('should display the text to indicate no waitlist', () => {
      const classWithNoWaitlist: IClass = TestUtils.copyObject(classJson);
      classWithNoWaitlist.enrolledTotal = 29;
      classWithNoWaitlist.enrolledCapacity = 30;
      classWithNoWaitlist.waitlistTotal = 0;
      classWithNoWaitlist.waitlistCapacity = 0;
      classWithNoWaitlist.quarter = '9999';
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={classWithNoWaitlist}
          currentTerm={'0000'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      expect(classResultsComponent).toMatchSnapshot();
      expect(classResultsComponent.html()).toContain('No Waitlist');
    });
  });
  describe('when a class is from the previous term', () => {
    describe('and has seats available', () => {
      it('should not display number of seats available', () => {
        const classFromPreviousTerm: IClass = TestUtils.copyObject(classJson);
        classFromPreviousTerm.quarter = '0000';
        classFromPreviousTerm.enrolledTotal = 20;
        classFromPreviousTerm.enrolledCapacity = 30;
        const classesCardsComponent: JSX.Element = (
          <ClassesCards
            classes={classFromPreviousTerm}
            currentTerm={'9999'}
          />
        );
        const classResultsComponent = mount(classesCardsComponent);
        expect(classResultsComponent).toMatchSnapshot();
        expect(classResultsComponent.html()).not.toContain('Seats Available: <span>10</span>/30');
      });
    });
    describe('and has seats available on waitlist', () => {
      it('should not display waitlist information', () => {
        const classFromPreviousTermWaitlist: IClass = TestUtils.copyObject(classJson);
        classFromPreviousTermWaitlist.quarter = '0000';
        classFromPreviousTermWaitlist.enrolledTotal = 30;
        classFromPreviousTermWaitlist.enrolledCapacity = 30;
        classFromPreviousTermWaitlist.waitlistTotal = 10;
        classFromPreviousTermWaitlist.waitlistCapacity = 30;
        const classesCardsComponent: JSX.Element = (
          <ClassesCards
            classes={classFromPreviousTermWaitlist}
            currentTerm={'9999'}
          />
        );
        const classResultsComponent = mount(classesCardsComponent);
        expect(classResultsComponent).toMatchSnapshot();
        expect(classResultsComponent.html()).not.toContain('Waitlist: <span>10</span>/30');
      });
    });
  });
  // @Todo fix this
  describe('when a class is closed', () => {
    describe('and has seats available', () => {
      const closedClass: IClass = TestUtils.copyObject(classJson);
      closedClass.quarter = '0008';
      closedClass.enrolledTotal = 30;
      closedClass.enrolledCapacity = 30;
      closedClass.waitlistTotal = 30;
      closedClass.waitlistCapacity = 30;
      const classesCardsComponent: JSX.Element = (
        <ClassesCards
          classes={closedClass}
          currentTerm={'0008'}
        />
      );
      const classResultsComponent = mount(classesCardsComponent);
      it('should display available seats', () => {
        expect(classResultsComponent).toMatchSnapshot();
        expect(classResultsComponent.html()).toContain('Seats Available: <span>10</span>/30');
      });
      it('should not display seats on waitlist', () => {
        expect(classResultsComponent).toMatchSnapshot();
        expect(classResultsComponent.html()).not.toContain('Waitlist: <span>10</span>/30');
      });
    });
  });
  
});
