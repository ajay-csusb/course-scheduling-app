import { mount, ReactWrapper, shallow } from 'enzyme';
import * as React from 'react';
import { classJson, classPDC, baseClassJson } from './ClassesJson';
import { ClassSearchResults } from '../src/public/js/ClassSearchResults';
import { IClass, Class } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';

function mountClassSearchResultsComponent(results: IClass[], term: string = '2194'): ReactWrapper {
  const onChangeOfLoadingMessage = jest.fn();
  const classSearchResultsComponent: JSX.Element = (
    <ClassSearchResults
      classes={results}
      onChangeOfLoadingMessage={onChangeOfLoadingMessage}
      currentTerm={term}
    />
  );
  return mount(classSearchResultsComponent);
}

describe('Given a class search results component', () => {

  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('when no classes are displayed in the results', () => {
    it('should display the 0 classes in the message', () => {
      const classSearchResultsWrapper = mountClassSearchResultsComponent([]);
      expect(classSearchResultsWrapper.html()).toContain('0 classes found');
      expect(classSearchResultsWrapper.html()).toContain('Try refining the search above to get more results');
    });
  });

  describe('when two classes are displayed', () => {
    let classSearchResultsWrapper: ReactWrapper;
    beforeAll(() => {
      classJson.enrolledTotal = 27;
      classJson.waitlistTotal = 0;
      classJson.enrollmentStatus = 'Open';
      classSearchResultsWrapper = mountClassSearchResultsComponent([classJson, baseClassJson]);
    });

    it('should display the 2 classes in the message', () => {
      expect(classSearchResultsWrapper.html()).toContain('2 classes found');
      expect(classSearchResultsWrapper.html()).not.toContain('Try refining the search above to get more results');
    });

    it('should display the class status as Open', () => {
      expect(classSearchResultsWrapper.html()).toContain('Open');
    });
    it('should display the number of available seats as 3', () => {
      const markup = '<div class="course-availability">Seats available: <span>3 / 30</span></div>';
      expect(classSearchResultsWrapper.html()).toContain(markup);
    });

    it('should display the CSS class name as course-status--open', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--open');
    });

  });

  describe('when a user searches for classes which are are not open for enrollment', () => {
    let classSearchResultsWrapper: ReactWrapper;
    beforeAll(() => {
      baseClassJson.quarter = '2194';
      baseClassJson.enrolledTotal = 30;
      baseClassJson.waitlistTotal = 30;
      baseClassJson.waitlistCapacity = 30;
      // Close not Closed. This is not a typo.
      baseClassJson.enrollmentStatus = 'Close';
      classSearchResultsWrapper = mountClassSearchResultsComponent([baseClassJson]);
    });

    it('should display the class status as Closed', () => {
      expect(classSearchResultsWrapper.html()).toContain('Closed');
    });

    it('should display the CSS class name as course-status--close', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--close');
    });
    it('should display available seats for classes which are closed', () => {
      expect(classSearchResultsWrapper.text()).toContain('Seats available');
    });
    it('should display number of seats in waitlist', () => {
      expect(classSearchResultsWrapper.text()).toContain('Waitlist');
    });

  });

  describe('when a user searches for classes from the pervious term', () => {
    let classSearchResultsWrapper: ReactWrapper;
    beforeAll(() => {
      classPDC.quarter = '000';
      classSearchResultsWrapper = mountClassSearchResultsComponent([classPDC]);
    });

    it('should display the class status as closed', () => {
      expect(classSearchResultsWrapper.html()).toContain('Closed');
    });

    it('should display the approproate CSS classes', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--close');
    });

    it('should not display available seats text', () => {
      expect(classSearchResultsWrapper.text()).not.toContain('Seats available');
    });

    it('should not display the text Waitlist', () => {
      expect(classSearchResultsWrapper.text()).not.toContain('Waitlist');
    });
  });

  describe('when a user searches for a class which has a waitlist', () => {
    beforeEach(() => {
      baseClassJson.enrolledTotal = 30;
      baseClassJson.waitlistCapacity = 60;
      baseClassJson.waitlistTotal = 1;
    });

    it('should display the text Waitlist', () => {
      const results = mountClassSearchResultsComponent([baseClassJson]);
      expect(results.text()).toContain('Waitlist');
    });
    it('should display the number of spots available in the waitlist', () => {
      const results = mountClassSearchResultsComponent([baseClassJson]);
      expect(results.text()).toContain('59 / 60');
    });

    describe('if the class has no waitlist', () => {
      it('should display the text No Waitlist', () => {
        baseClassJson.enrolledTotal = 30;
        baseClassJson.waitlistCapacity = 0;
        const results = mountClassSearchResultsComponent([baseClassJson]);
        expect(results.text()).toContain('No Waitlist');
      });
    });

    describe('if the class is open', () => {
      it('should not display the text Waitlist', () => {
        baseClassJson.enrolledTotal = 20;
        baseClassJson.enrollmentStatus = 'Open';
        const results = mountClassSearchResultsComponent([baseClassJson]);
        expect(results.text()).not.toContain('Waitlist');
      });
    });
  });

  describe('course attribute label', () => {
    const classCourseAttr = JSON.parse(JSON.stringify(classJson));
    describe('when a class does not have a Course Attribute', () => {
      baseClassJson.courseAttr = '';
      const results = mountClassSearchResultsComponent([baseClassJson]);
      it('should not contain the label Course Attribute', () => {
        expect(results.text()).not.toContain('Course Attribute');
      });
    });

    describe('when a class has a Course Attribute', () => {
      baseClassJson.courseAttr = 'Foo, bar and baz';
      const results = mountClassSearchResultsComponent([baseClassJson]);
      it('should contain the label Course Attribute', () => {
        expect(results.text()).toContain('Course Attribute');
        expect(results.text()).toContain('Foo, bar and baz');
      });
    });

  });

  describe('instructor name and profile URL', () => {
    describe('when the instructor name is not available', () => {
      classJson.instructorName = '';
      const classSearchResultsWrapper = mountClassSearchResultsComponent([classJson]);
      it('should display TBD', () => {
        expect(classSearchResultsWrapper.html()).toContain('<span>Instructor</span> TBD');
      });
    });

    describe('when the instructor name is available', () => {
      let classSearchResultsWrapper = mountClassSearchResultsComponent([classJson]);
      beforeAll(() => {
        classJson.instructorName = 'Bakeman, Melissa';
        classJson.profile = '/profile/bakemann';
        classSearchResultsWrapper = mountClassSearchResultsComponent([classJson]);
      });

      it('should display the attribute to open the profile link in a new tab', () => {
        expect(classSearchResultsWrapper.html()).toContain('target="_blank"');
      });

      it('should display the path for instructor profile link', () => {
        expect(classSearchResultsWrapper.html()).toContain('https://search.csusb.edu/profile/bakemann');
      });

      it('should display the instructors name', () => {
        expect(classSearchResultsWrapper.html()).toContain('Bakeman, Melissa');
      });

      describe('but the profile is not available', () => {
        beforeAll(() => {
          classJson.profile = '';
          classSearchResultsWrapper = mountClassSearchResultsComponent([classJson]);
        });
        it('should not display the profile URL', () => {
          expect(classSearchResultsWrapper.html()).not.toContain('https://search.csusb.edu/profile/bakemann');
        });
      });
    });

  });

  describe('class title and topic', () => {
    describe('when a class title has a topic', () => {
      classJson.title = 'Foo-title';
      classJson.topic = 'loreum IPSUM';
      const classSearchResultsComponent = mountClassSearchResultsComponent([classJson]);
      it('should display the topic', () => {
        expect(classSearchResultsComponent.html()).toContain('Foo-title: Loreum Ipsum');
      });
    });

    describe('when a class title does not have a topic', () => {
      classJson.title = 'Foo-title';
      classJson.topic = '';
      const classSearchResultsComponent = mountClassSearchResultsComponent([classJson]);
      it('should not display the topic', () => {
        expect(classSearchResultsComponent.html()).not.toContain('Foo-title: ');
        expect(classSearchResultsComponent.html()).toContain('Foo-title');
      });
    });

  });

  describe('when a class information is displayed', () => {
    const classSearchResultsComponent = mountClassSearchResultsComponent([classJson]);
    it('should display tooltip', () => {
      expect(classSearchResultsComponent.html()).toContain('<button class="course-info-btn">');
    });
  });

  afterEach(() => {
    baseClassJson.enrolledTotal = 10;
    baseClassJson.enrolledCapacity = 30;
    baseClassJson.quarter = '2194';
    classPDC.quarter = '2192';
    classJson.profile = '';
  });

});

describe('tabs', () => {
  describe('When a class search container mounted', () => {
    let classSearchContainerWrapper = null;
    beforeEach(() => {
      classSearchContainerWrapper = mountClassSearchResultsComponent([classJson]);
    });
    it('should display the tabs', () => {
      expect(classSearchContainerWrapper.text()).toContain('List View');
      expect(classSearchContainerWrapper.text()).toContain('Table View');
    });
  });

  describe('when the table display format is selected', () => {
    let classSearchResultsComponent;
    beforeEach(() => {
      classSearchResultsComponent = mountClassSearchResultsComponent([classJson]);
    });
    it('should set the display format to table', () => {
      expect(classSearchResultsComponent.state('format')).toEqual('lists');
      classSearchResultsComponent.find('#table').simulate('click');
      expect(classSearchResultsComponent.state('format')).toEqual('table');
      expect(sessionStorage.setItem).toBeCalledWith('format', 'table');
    });

    it('should pass the correct props to DisplayFormatTabs component', () => {
      classSearchResultsComponent.find('#table').simulate('click');
      const displayFormatTabsWrapper = classSearchResultsComponent.find('DisplayFormatTabs');
      expect(displayFormatTabsWrapper.prop('format')).toEqual('table');
    });

  });
});

describe('table format', () => {
  describe('when a user selects a table format', () => {
    let classSearchContainerWrapper;
    beforeEach(() => {
    const acctClass: IClass = TestUtils.copyObject(classJson);
    const bioClass: IClass = TestUtils.copyObject(classJson);
    acctClass.subject = 'ACCT';
    acctClass.title = 'Introduction to Accounting';
    acctClass.topic = 'Special topics in Accounting';
    acctClass.classNumber = 100;
    bioClass.subject = 'BIOL';
    bioClass.title = 'Introduction to Biology';
    bioClass.classNumber = 200;
    classSearchContainerWrapper = mountClassSearchResultsComponent([acctClass, bioClass]);
    classSearchContainerWrapper.setState({ format: 'table' });
    });
    it('should display table headers', () => {
      expect(classSearchContainerWrapper.html()).toContain('Subject');
      expect(classSearchContainerWrapper.html()).toContain('Unit');
    });
    it('should display the class details', () => {
      expect(classSearchContainerWrapper.html()).toContain('ACCT');
      expect(classSearchContainerWrapper.html()).toContain('Introduction to Accounting');
      expect(classSearchContainerWrapper.html()).toContain(': Special Topics In Accounting');
      expect(classSearchContainerWrapper.html()).toContain('BIOL');
      expect(classSearchContainerWrapper.html()).toContain('Introduction to Biology');
    });
  });

});
