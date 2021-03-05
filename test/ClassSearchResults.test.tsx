import { mount, ReactWrapper, shallow } from 'enzyme';
import * as React from 'react';
import { classJson, classPDC, baseClassJson } from './ClassesJson';
import { ClassSearchResults } from '../src/public/js/ClassSearchResults';
import { IClass, Class } from '../src/public/js/Class';
import { TestUtils } from './TestUtils';
import { DisplayFormatTabs } from '../src/public/js/DisplayFormatTabs';
import ExportToExcel from '../src/public/js/ExportToExcel';
import { ClassesCards } from '../src/public/js/ClassesCards';
import DuplicateClassesCards from '../src/public/js/DuplicateClassesCards';
import { SelectListSortBy } from '../src/public/js/SelectListSortBy';
import Pagination from '../src/public/js/Pagination';

function mountClassSearchResultsComponent(results: IClass[], term: string = '2194'): ReactWrapper {
  const mockCallback = jest.fn();
  const classSearchResultsComponent: JSX.Element = (
    <ClassSearchResults
      classes={results}
      currentPage={1}
      tab={'list'}
      numberOfClasses={results.length}
      totalPages={Math.ceil(results.length / 30)}
      onChangeOfLoadingMessage={mockCallback}
      onChangeOfPageNumber={mockCallback}
      onChangeOfTab={mockCallback}
      currentTerm={term}
    />
  );
  return mount(classSearchResultsComponent);
}

describe('Given a class search results component', () => {
  beforeAll(() => {
    TestUtils.ajax();
  });

  describe('states', () => {
    const classSearchResultsWrapper = mountClassSearchResultsComponent([]);

    test('sortBy should have the default value of catalogNo', () => {
      expect(classSearchResultsWrapper.state('sortBy')).toEqual('catalogNo');
    });
  });

  describe('when no classes are displayed in the results', () => {
    const classSearchResultsWrapper = mountClassSearchResultsComponent([]);

    it('should display 0 classes in the message', () => {
      const classSearchResultsWrapper = mountClassSearchResultsComponent([]);
      expect(classSearchResultsWrapper.html()).toContain('0 classes found');
      expect(classSearchResultsWrapper.html()).toContain('Try refining the search above to get more results');
    });

    it('should not display the SelectListSortBy component', () => {
      const sortByWrapper = classSearchResultsWrapper.find(SelectListSortBy);
      expect(sortByWrapper).toHaveLength(0);
    });

    it('should not display tabs', () => {
      expect(classSearchResultsWrapper.find(DisplayFormatTabs)).toHaveLength(0);
    });

    it('should not display export to excel component', () => {
      expect(classSearchResultsWrapper.find(ExportToExcel)).toHaveLength(0);
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

    it('should have the CSS class name as course-status--open', () => {
      expect(classSearchResultsWrapper.html()).toContain('course-status--open');
    });

    it.skip('should display the SelectListSortBy component', () => {
      const selectListSortByWrapper = classSearchResultsWrapper.find(SelectListSortBy);
      expect(selectListSortByWrapper).toHaveLength(1);
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

    it('should have the CSS class name as course-status--close', () => {
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
      expect(classSearchResultsWrapper.text()).not.toContain('.course-availability');
    });

    it('should not display the text Waitlist', () => {
      expect(classSearchResultsWrapper.text()).not.toContain('Waitlist spots available');
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
        expect(results.text()).not.toContain('Waitlist spots available');
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
      classJson.instructorName = 'TBD';
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
  describe('when the results contains atleast one class', () => {
    let classSearchResultsWrapper = null;
    beforeEach(() => {
      classSearchResultsWrapper = mountClassSearchResultsComponent([classJson]);
    });

    it('should display the two tabs', () => {
      expect(classSearchResultsWrapper.text()).toContain('List');
      expect(classSearchResultsWrapper.text()).toContain('Table');
    });

    it('should not display the export to excel link', () => {
      expect(classSearchResultsWrapper.text()).not.toContain('Export to Excel');
    });
  });

  describe('when the table tab is clicked', () => {
    let classSearchResultsComponent;
    beforeEach(() => {
      classSearchResultsComponent = mountClassSearchResultsComponent([classJson]);
      classSearchResultsComponent.setProps({ tab: 'table' });
    });

    it('should pass the correct props to DisplayFormatTabs component', () => {
      const displayFormatTabsWrapper = classSearchResultsComponent.find('DisplayFormatTabs');
      expect(displayFormatTabsWrapper.prop('format')).toEqual('table');
    });

    it('should show the Export to Excel link', () => {
      expect(classSearchResultsComponent.find(ExportToExcel)).toHaveLength(1);
    });

    it('should call the onChangeOfTab prop', () => {
      classSearchResultsComponent = mountClassSearchResultsComponent([classJson]);
      classSearchResultsComponent.find('#table').simulate('click');
      expect(classSearchResultsComponent.props().onChangeOfTab).toHaveBeenCalled();
    });
  });
});

describe('table', () => {
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
      classSearchContainerWrapper.setProps({ tab: 'table' });
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

describe('classes having multiple times', () => {
  it('should combine multiple classes into one', () => {
    const copyClassJson: IClass = TestUtils.copyObject(classJson);
    const acctClass = TestUtils.copyObject(copyClassJson);
    acctClass.subject = 'ACCT';
    acctClass.classNumber = 101;
    acctClass.classStartTime = '8:00 AM';
    acctClass.classEndTime = '9:00 AM';
    const bioClass1 = TestUtils.copyObject(copyClassJson);
    bioClass1.subject = 'BIOL';
    bioClass1.classNumber = 100;
    bioClass1.classStartTime = '9:00 AM';
    bioClass1.classEndTime = '10:00 AM';
    const bioClass2 = TestUtils.copyObject(copyClassJson);
    bioClass2.subject = 'BIOL';
    bioClass2.classNumber = 100;
    bioClass2.classStartTime = '11:00 AM';
    bioClass2.classEndTime = '12:00 PM';
    const classes: IClass[] = [acctClass, bioClass1, bioClass2];
    const classSearchResultsWrapper = mountClassSearchResultsComponent(classes);

    expect(classSearchResultsWrapper.find(ClassesCards)).toHaveLength(1);
    expect(classSearchResultsWrapper.find(DuplicateClassesCards)).toHaveLength(1);
    expect(classSearchResultsWrapper.find('.course')).toHaveLength(2);
    expect(classSearchResultsWrapper.html()).toMatch(/BIOL/);
    expect(classSearchResultsWrapper.html()).toMatch(/ACCT/);
    expect(classSearchResultsWrapper.html()).toMatch(/8:00 am - 9:00 am/);
    expect(classSearchResultsWrapper.html()).toMatch(/9:00 am - 10:00 am/);
    expect(classSearchResultsWrapper.html()).toMatch(/11:00 am - 12:00 pm/);
  });
});

describe.skip('SelectListSortBy component', () => {
  it('should be displayed only when the result has atleast one class', () => {
    const classSearchResultsWrapper = mountClassSearchResultsComponent([baseClassJson, classJson]);
    expect(classSearchResultsWrapper.find(SelectListSortBy)).toHaveLength(1);
  });

  it('should update sortBy state when a user selects an option', () => {
    const classSearchResultsWrapper = mountClassSearchResultsComponent([baseClassJson, classJson]);
    classSearchResultsWrapper.find('.sort-by-select > select').simulate('change', { target: { value: 'foo' } });
    expect(classSearchResultsWrapper.state('sortBy')).toEqual('foo');
  });
});

describe.skip('sorting behavior', () => {
  let classSearchResultsComponentWrapper;
  beforeEach(() => {
    const acctClass: IClass = TestUtils.copyObject(classJson);
    const bioClass: IClass = TestUtils.copyObject(classJson);
    acctClass.subject = 'ACCT';
    acctClass.title = 'Introduction to Accounting';
    acctClass.topic = 'Special topics in Accounting';
    acctClass.classNumber = 100;
    acctClass.catalogNo = '101';
    acctClass.instructorName = 'Zain';
    acctClass.mon = 'Y';
    acctClass.wed = 'N';
    acctClass.classStartTime = '7:00 PM';
    acctClass.classEndTime = '8:00 PM';
    acctClass.enrolledTotal = 10;
    acctClass.enrolledCapacity = 30;
    acctClass.waitlistTotal = 30;
    acctClass.enrolledCapacity = 50;
    bioClass.subject = 'BIOL';
    bioClass.title = 'Introduction to Biology';
    bioClass.classNumber = 200;
    bioClass.catalogNo = '102';
    bioClass.instructorName = 'Alan';
    bioClass.mon = 'N';
    bioClass.wed = 'N';
    bioClass.fri = 'Y';
    bioClass.classStartTime = '9:00 AM';
    bioClass.classEndTime = '10:00 AM';
    bioClass.enrolledTotal = 20;
    bioClass.enrolledCapacity = 30;
    bioClass.waitlistTotal = 40;
    bioClass.enrolledCapacity = 50;
    classSearchResultsComponentWrapper = mountClassSearchResultsComponent([acctClass, bioClass]);
  });

  test('sort by class number', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'classNumber-asc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards)).toHaveLength(2);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/ACCT 101/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/BIOL 102/);
  });

  test('sort by subject', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'subject-desc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/BIOL 102/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/ACCT 101/);
  });

  test('sort by title', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'title-desc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/Introduction to Biology/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/Introduction to Accounting/);
  });

  test('sort by instructor', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'instructorName-asc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/Alan/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/Zain/);
  });

  test('sort by meeting days', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'days-desc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/M/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/F/);
  });

  test('sort by meeting times', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'time-asc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/9:00 am - 10:00 am/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/7:00 pm - 8:00 pm/);
  });

  test('sort by seats available', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'seatsAvailable-desc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/ACCT 101/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/BIOL 102/);
  });

  test('sort by waitlist', () => {
    classSearchResultsComponentWrapper
      .find('.sort-by-select > select')
      .simulate('change', { target: { value: 'seatsWaitlist-asc' } });
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(0).html()).toMatch(/BIOL 102/);
    expect(classSearchResultsComponentWrapper.find(ClassesCards).at(1).html()).toMatch(/ACCT 101/);
  });
});

describe('markup', () => {
  test('HTML markup of the results component', () => {
    const classSearchResultsWrapper = mountClassSearchResultsComponent([classJson]);
    expect(classSearchResultsWrapper.find('.form-controls')).toMatchSnapshot();
  });
});

describe('pagination', () => {
  let resultClasses: IClass[] = [];
  let hours = 9;
  let minutes = 10;
  for (let index = 0; index < 52; index++) {
    const copyObject = TestUtils.copyObject(classJson);
    copyObject.classNumber = index;
    copyObject.classStartTime = `${hours} : ${minutes} PM`;
    copyObject.classEndTime = `${hours} : ${minutes + 1} PM`;
    minutes += 1;
    resultClasses.push(copyObject);
  }

  describe('when we have more than 30 classes', () => {
    it('should display a pager', () => {
      const classSearchResultsWrapper = mountClassSearchResultsComponent(resultClasses);
      expect(classSearchResultsWrapper.find('.pagination')).toHaveLength(1);
    });

    it('should display the correct number of pages', () => {
      const classSearchResultsWrapper = mountClassSearchResultsComponent(resultClasses);
      expect(classSearchResultsWrapper.find('.pagination li')).toHaveLength(5);
    });
  });

  describe('when we have less than 25 classes', () => {
    it('should not display a pager', () => {
      const classSearchResultsWrapper = mountClassSearchResultsComponent(resultClasses.splice(0, 20));
      expect(classSearchResultsWrapper.find('.pagination')).toHaveLength(0);
    });
  });

  test('onChangeOfPager props is called after clicking the pager', () => {
    const classSearchResultsWrapper = mountClassSearchResultsComponent(resultClasses);
    const paginationWrapper = classSearchResultsWrapper.find(Pagination);
    paginationWrapper.find('li a').at(3).simulate('click');
    expect(classSearchResultsWrapper.props().onChangeOfPageNumber).toHaveBeenCalled();
  });

  describe('when the table tab is clicked', () => {
    it('should not display the pager', () => {
      const classSearchResultsWrapper = mountClassSearchResultsComponent(resultClasses);
      classSearchResultsWrapper.setProps({ tab: 'table' });
      expect(classSearchResultsWrapper.find('.pagination')).toHaveLength(0);
    });
  });
});
