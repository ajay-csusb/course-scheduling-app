import * as React from 'react';
import DuplicateClassesCards from '../src/public/js/DuplicateClassesCards';
import { classJson } from './ClassesJson';
import { mount } from 'enzyme';
import { TestUtils } from './TestUtils';
import { IClass } from '../src/public/js/Class';
import { Popover } from '@blueprintjs/core';

describe('when a class has multiple meeting times', () => {
    const copyClassJson: IClass = TestUtils.copyObject(classJson);
    copyClassJson.subject = 'BIOL';
    copyClassJson.catalogNo = '101';
    copyClassJson.classNumber = 100;
    copyClassJson.title = 'Introduction to Biology';
    copyClassJson.topic = 'Special topics in Biology';
    copyClassJson.courseAttr = 'Zero Cost Course Materials, Low Cost Course Materials';
    copyClassJson.fullSsrComponent = 'Seminar';
    copyClassJson.fee = '$100.00';
    copyClassJson.quarter = '0000';

    const bioClass1: IClass = TestUtils.copyObject(copyClassJson);
    bioClass1.classStartTime = '9:00 AM';
    bioClass1.classEndTime = '10:00 AM';
    bioClass1.mon = 'Y';
    bioClass1.campus = 'MAIN';
    const bioClass2: IClass = TestUtils.copyObject(copyClassJson);
    bioClass2.classStartTime = '11:00 AM';
    bioClass2.classEndTime = '12:00 PM';
    bioClass2.wed = 'Y';
    bioClass2.campus = 'PALM';
    const bioClass3: IClass = TestUtils.copyObject(copyClassJson);
    bioClass3.classStartTime = '1:00 PM';
    bioClass3.classEndTime = '3:00 PM';
    bioClass2.fri = 'Y';

  test('snapshot', () => {
    const classes: IClass[] = [bioClass1, bioClass2, bioClass3];
    const duplicateCardsComponent: JSX.Element = (
      <DuplicateClassesCards
        classes={classes}
        currentTerm={'000'}
      />
    );
    const duplicateCardsComponentWrapper = mount(duplicateCardsComponent);
    expect(duplicateCardsComponentWrapper).toMatchSnapshot();
  })

  it('should display each meeting time in a new row', () => {
    const classes: IClass[] = [bioClass1, bioClass2, bioClass3];
    const duplicateCardsComponent: JSX.Element = <DuplicateClassesCards classes={classes} currentTerm={'0000'} />;
    const duplicateCardsComponentWrapper = mount(duplicateCardsComponent);

    expect(duplicateCardsComponentWrapper.html()).toMatch(
      /BIOL 101 - Introduction to Biology: Special Topics In Biology/
    );
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Section 01/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Class No. 100/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Fee/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Seminar/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Textbook/);
    expect(duplicateCardsComponentWrapper.find('.course-header')).toHaveLength(1);
    expect(duplicateCardsComponentWrapper.find('.course-details')).toHaveLength(1);
    expect(duplicateCardsComponentWrapper.find('.course-id')).toHaveLength(1);
    expect(duplicateCardsComponentWrapper.find('.course-name')).toHaveLength(1);
    expect(duplicateCardsComponentWrapper.find('.course-books')).toHaveLength(1);
    expect(duplicateCardsComponentWrapper.find('.course--icons')).toHaveLength(1);
    expect(duplicateCardsComponentWrapper.find('.course-desc')).toHaveLength(3);
    expect(duplicateCardsComponentWrapper.find(Popover)).toHaveLength(1);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/9:00 am - 10:00 am/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/11:00 am - 12:00 pm/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/1:00 pm - 3:00 pm/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/M/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/W/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/F/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/COE 101/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/San Bernardino/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Palm Desert/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Dyck, Harold/);
    expect(duplicateCardsComponentWrapper.html()).toMatch(/Classroom/)
    expect(duplicateCardsComponentWrapper.html()).toMatch(/2 \/ 30/);
  });
});
