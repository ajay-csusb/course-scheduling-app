import * as React from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';
import { IClass, Class } from './Class';
import { Cell, Table, Column, ColumnHeaderCell, IMenuContext, CopyCellsMenuItem, TruncatedFormat } from '@blueprintjs/table';
import { Utils } from './Utils';
import { Menu, MenuItem } from '@blueprintjs/core';
import * as Sort from './Sort';
interface ITableDisplayProps {
  classes: IClass[];
}

export class Grid extends React.Component<ITableDisplayProps> {

  private classes: IClass[];
  private subjectCellRenderer: (row: number) => JSX.Element;
  private titleCellRenderer: (row: number) => JSX.Element;
  private sectionCellRenderer: (row: number) => JSX.Element;
  private classNumberCellRenderer: (row: number) => JSX.Element;
  private typeCellRenderer: (row: number) => JSX.Element;
  private unitCellRenderer: (row: number) => JSX.Element;
  private instructorCellRenderer: (row: number) => JSX.Element;
  private modeCellRenderer: (row: number) => JSX.Element;
  private sessionCellRenderer: (row: number) => JSX.Element;
  private seatsAvailableCellRenderer: (row: number) => JSX.Element;
  private waitlistCellRenderer: (row: number) => JSX.Element;
  private attributeCellRenderer: (row: number) => JSX.Element;
  private campusCellRenderer: (row: number) => JSX.Element;
  private textbookCellRenderer: (row: number) => JSX.Element;
  private dayCellRenderer: (row: number) => JSX.Element;
  private timeCellRenderer: (row: number) => JSX.Element;

  constructor(props: ITableDisplayProps) {
    super(props);
    this.classes = this.props.classes;
    this.subjectCellRenderer = this.getSubject.bind(this);
    this.titleCellRenderer = this.getTitle.bind(this);
    this.sectionCellRenderer = this.getSection.bind(this);
    this.classNumberCellRenderer = this.getClassNumber.bind(this);
    this.typeCellRenderer = this.getType.bind(this);
    this.unitCellRenderer = this.getUnit.bind(this);
    this.instructorCellRenderer = this.getInstructor.bind(this);
    this.modeCellRenderer = this.getMode.bind(this);
    this.sessionCellRenderer = this.getSession.bind(this);
    this.seatsAvailableCellRenderer = this.getSeatsAvailable.bind(this);
    this.waitlistCellRenderer = this.getWaitlist.bind(this);
    this.attributeCellRenderer = this.getAttribute.bind(this);
    this.campusCellRenderer = this.getCampus.bind(this);
    this.textbookCellRenderer = this.getTextbook.bind(this);
    this.dayCellRenderer = this.getDay.bind(this);
    this.timeCellRenderer = this.getTime.bind(this);
    this.sortByString = this.sortByString.bind(this);
    this.subjectColumnHeader = this.subjectColumnHeader.bind(this);
    this.titleColumnHeader = this.titleColumnHeader.bind(this);
    this.sectionColumnHeader = this.sectionColumnHeader.bind(this);
    this.classNumberColumnHeader = this.classNumberColumnHeader.bind(this);
    this.typeColumnHeader = this.typeColumnHeader.bind(this);
    this.unitColumnHeader = this.unitColumnHeader.bind(this);
    this.instructorColumnHeader = this.instructorColumnHeader.bind(this);
    this.dayColumnHeader = this.dayColumnHeader.bind(this);
    this.timeColumnHeader = this.timeColumnHeader.bind(this);
    this.instructionModeColumnHeader = this.instructionModeColumnHeader.bind(this);
    this.sessionCodeColumnHeader = this.sessionCodeColumnHeader.bind(this);
    this.seatsAvailableColumnHeader = this.seatsAvailableColumnHeader.bind(this);
    this.waitlistColumnHeader = this.waitlistColumnHeader.bind(this);
    this.courseAttrColumnHeader = this.courseAttrColumnHeader.bind(this);
    this.campusColumnHeader = this.campusColumnHeader.bind(this);
    this.textbookColumnHeader = this.textbookColumnHeader.bind(this);
    this.columnMenu = this.columnMenu.bind(this);
    this.getCopiedData = this.getCopiedData.bind(this);
    this.renderBodyMenu = this.renderBodyMenu.bind(this);
    this.sortSubject = this.sortSubject.bind(this);
    this.sortCampus = this.sortCampus.bind(this);
    this.sortInstructionMode = this.sortInstructionMode.bind(this);
    this.sortSessionCode = this.sortSessionCode.bind(this);
    this.sortMeetingTime = this.sortMeetingTime.bind(this);
    this.sortMeetingDays = this.sortMeetingDays.bind(this);
    this.sortSeatsAvailable = this.sortSeatsAvailable.bind(this);
    this.sortByString = this.sortByString.bind(this);
    this.sortByNumber = this.sortByNumber.bind(this);
  }
  public render(): JSX.Element {
    const innerColumns = [
      [this.subjectColumnHeader, this.subjectCellRenderer],
      [this.titleColumnHeader, this.titleCellRenderer],
      [this.sectionColumnHeader, this.sectionCellRenderer],
      [this.classNumberColumnHeader, this.classNumberCellRenderer],
      [this.typeColumnHeader, this.typeCellRenderer],
      [this.unitColumnHeader, this.unitCellRenderer],
      [this.instructorColumnHeader, this.instructorCellRenderer],
      [this.dayColumnHeader, this.dayCellRenderer],
      [this.timeColumnHeader, this.timeCellRenderer],
      [this.instructionModeColumnHeader, this.modeCellRenderer],
      [this.sessionCodeColumnHeader, this.sessionCellRenderer],
      [this.seatsAvailableColumnHeader, this.seatsAvailableCellRenderer],
      [this.waitlistColumnHeader, this.waitlistCellRenderer],
      [this.courseAttrColumnHeader, this.attributeCellRenderer],
      [this.campusColumnHeader, this.campusCellRenderer],
      [this.textbookColumnHeader, this.textbookCellRenderer],
    ];
    const columns = [];
    for (const innerColumn of innerColumns) {
      columns.push(<Column key={Date()} columnHeaderCellRenderer={innerColumn[0]} cellRenderer={innerColumn[1]} />);
    }
    return (
      <Table
        key={Date()} // Hack! Without this, the table would only display 4 columns
        numRows={this.classes.length}
        enableColumnResizing={false}
        getCellClipboardData={this.getCopiedData}
        bodyContextMenuRenderer={this.renderBodyMenu}
        columnWidths={[100, 300, 100, 100, 100, 50, 150, 100, 120, 150, 100, 150, 100, 300, 120, 150]}
      >
        {columns}
      </Table>
    );
  }

  private renderBodyMenu(context: IMenuContext): any {
    return (
      <Menu>
        <CopyCellsMenuItem context={context} getCellData={this.getCopiedData} text="Copy" />
      </Menu>
    );
  }
  private titleColumnHeader() {
    return (<ColumnHeaderCell name={'Title'} menuRenderer={() => this.columnMenu('title')} />);
  }

  private subjectColumnHeader() {
    return (<ColumnHeaderCell name={'Subjects'} menuRenderer={() => this.columnMenu('subject')} />);
  }

  private sectionColumnHeader() {
    return (<ColumnHeaderCell name={'Section'} menuRenderer={() => this.columnMenu('classSection')} />);
  }

  private classNumberColumnHeader() {
    return (<ColumnHeaderCell name={'Class Number'} menuRenderer={() => this.columnMenu('classNumber')} />);
  }

  private typeColumnHeader() {
    return (<ColumnHeaderCell name={'Type'} menuRenderer={() => this.columnMenu('fullSsrComponent')} />);
  }

  private unitColumnHeader() {
    return (<ColumnHeaderCell name={'Unit'} menuRenderer={() => this.columnMenu('csuUnits')} />);
  }

  private instructorColumnHeader() {
    return (<ColumnHeaderCell name={'Instructor'} menuRenderer={() => this.columnMenu('instructorName')} />);
  }

  private dayColumnHeader() {
    return (<ColumnHeaderCell name={'Day(s)'} menuRenderer={() => this.columnMenu('meetingDays')} />);
  }

  private timeColumnHeader() {
    return (<ColumnHeaderCell name={'Time'} menuRenderer={() => this.columnMenu('classStartTime')} />);
  }

  private instructionModeColumnHeader() {
    return (<ColumnHeaderCell name={'Mode'} menuRenderer={() => this.columnMenu('instructionMode')} />);
  }

  private sessionCodeColumnHeader() {
    return (<ColumnHeaderCell name={'Session'} menuRenderer={() => this.columnMenu('sessionCode')} />);
  }

  private seatsAvailableColumnHeader() {
    return (<ColumnHeaderCell name={'Seats Available'} menuRenderer={() => this.columnMenu('enrolledTotal')} />);
  }

  private waitlistColumnHeader() {
    return (<ColumnHeaderCell name={'Waitlist Seats Available'} menuRenderer={() => this.columnMenu('waitlistTotal')} />);
  }

  private courseAttrColumnHeader() {
    return (<ColumnHeaderCell name={'Attribute'} menuRenderer={() => this.columnMenu('courseAttr')} />);
  }

  private campusColumnHeader() {
    return (<ColumnHeaderCell name={'Campus'}  menuRenderer={() => this.columnMenu('campus')}/>);
  }

  private textbookColumnHeader() {
    return (<ColumnHeaderCell name={'Textbook'} />);
  }

  private sortByString(key: string, column: string = 'subject') {
    this.classes = Sort.sortByString(this.classes, key, column);
    this.forceUpdate();
  }

  private sortByNumber(key: string, column: string) {
    this.classes = Sort.sortByInt(this.classes, key, column);
    this.forceUpdate();
  }

  private sortSubject(key: string) {
    if (key === 'des') {
      this.classes = Sort.sortByInt(this.classes, 'des', 'catalogNo');
      this.classes = Sort.sortByString(this.classes, 'des', 'subject');
    } else {
      this.classes = Sort.sortByInt(this.classes, 'asc', 'catalogNo');
      this.classes = Sort.sortByString(this.classes, 'asc', 'subject');
    }
    this.forceUpdate();
  }

  private sortCampus(key: string) {
    this.classes = (key === 'asc') ? Sort.sortByCampus(this.classes, 'asc') : Sort.sortByCampus(this.classes, 'des');
    this.forceUpdate();
  }

  private sortInstructionMode(key: string) {
    this.classes = (key === 'asc') ? Sort.sortByInstructionMode(this.classes, 'asc')
    : Sort.sortByInstructionMode(this.classes, 'des');
    this.forceUpdate();
  }

  private sortSessionCode(key: string) {
    this.classes = Sort.sortByString(this.classes, key, 'sessionCode');
    this.classes = Sort.sortByInt(this.classes, key, 'sessionCode');
    this.forceUpdate();
  }

  private sortMeetingTime(key: string) {
    this.classes = Sort.sortByMeetingTime(this.classes, key);
    this.forceUpdate();
  }

  private sortMeetingDays(key: string) {
    this.classes = Sort.sortByMeetingDays(this.classes, key);
    this.forceUpdate();
  }

  private sortSeatsAvailable(key: string, id: string) {
    this.classes = (id === 'enrolledTotal') ? Sort.sortBySeatsAvailable(this.classes, key)
    : Sort.sortBySeatsAvailableInWaitlist(this.classes, key);
    this.forceUpdate();
  }
  private columnMenu(id: string = 'subject'): JSX.Element {
    let menuItems = <></>;
    const callbacks = {
      subject: {
        use_id: false,
        id: 'subject',
        cb: this.sortSubject,
      },
      title: {
        use_id: true,
        id: 'title',
        cb: this.sortByString,
      },
      fullSsrComponent: {
        use_id: true,
        cb: this.sortByString,
      },
      instructorName: {
        use_id: true,
        cb: this.sortByString,
      },
      courseAttr: {
        use_id: true,
        cb: this.sortByString,
      },
      classNumber: {
        use_id: true,
        cb: this.sortByNumber,
      },
      csuUnits: {
        use_id: true,
        cb: this.sortByNumber,
      },
      classSection: {
        use_id: true,
        cb: this.sortByNumber,
      },
      campus: {
        use_id: false,
        cb: this.sortCampus,
      },
      instructionMode: {
        use_id: false,
        cb: this.sortInstructionMode,
      },
      sessionCode: {
        use_id: false,
        cb: this.sortSessionCode,
      },
      classStartTime: {
        use_id: false,
        cb: this.sortMeetingTime,
      },
      meetingDays: {
        use_id: false,
        cb: this.sortMeetingDays,
      },
      enrolledTotal: {
        use_id: true,
        cb: this.sortSeatsAvailable,
      },
      waitlistTotal: {
        use_id: true,
        cb: this.sortSeatsAvailable,
      },
    };

    if (!callbacks[id].use_id) {
      menuItems = (
        <>
          <MenuItem icon="sort-asc" onClick={() => { callbacks[id].cb('asc'); }} text="Sort Asc" />
          <MenuItem icon="sort-desc" onClick={() => { callbacks[id].cb('des'); }} text="Sort Desc" />
        </>
      );
    } else {
      menuItems = (
        <>
          <MenuItem icon="sort-asc" onClick={() => { callbacks[id].cb('asc', id); }} text="Sort Asc" />
          <MenuItem icon="sort-desc" onClick={() => { callbacks[id].cb('des', id); }} text="Sort Desc" />
        </>
      );
    }

    return <Menu>{menuItems}</Menu>;
  }

  private getSubject(rowIndex: number): JSX.Element {
    const _class = this.classes[rowIndex];
    const subject = `${_class.subject} ${_class.catalogNo}`;
    return (<Cell>{subject}</Cell>);
  }

  private getTitle(rowIndex: number): JSX.Element {
    const _class = this.classes[rowIndex];
    const title = _class.title;
    const topicLowercase = _class.topic.toLowerCase();
    const topic = (topicLowercase.trim().length !== 0) ? `: ${Utils.toCapitalizeCase(topicLowercase)}` : '';
    return (
      <Cell tooltip={`${title}${topic}`}>
        <TruncatedFormat truncateLength={50} >{`${title}${topic}`}</TruncatedFormat>
      </Cell>);
  }

  private getSection(rowIndex: number): JSX.Element {
    return (<Cell>{this.classes[rowIndex].classSection}</Cell>);
  }

  private getClassNumber(rowIndex: number): JSX.Element {
    return (<Cell>{this.classes[rowIndex].classNumber}</Cell>);
  }

  private getType(rowIndex: number): JSX.Element {
    return (<Cell>{this.classes[rowIndex].fullSsrComponent}</Cell>);
  }

  private getUnit(rowIndex: number): JSX.Element {
    return (<Cell>{this.classes[rowIndex].csuUnits}</Cell>);
  }

  private getInstructor(rowIndex: number): JSX.Element {
    const _class: IClass = this.classes[rowIndex];
    return (<Cell>{ClassSearchUtils.getInstructorMarkup(_class)}</Cell>);
  }

  private getMode(rowIndex: number): JSX.Element {
    return (<Cell>{this.getModeUnformatted(rowIndex)}</Cell>);
  }

  private getSession(rowIndex: number): JSX.Element {
    return (<Cell>{this.getSessionUnformatted(rowIndex)}</Cell>);
  }

  private getSeatsAvailable(rowIndex: number): JSX.Element {
    return (<Cell>{this.getSeatsAvailableUnformatted(rowIndex)}</Cell>);
  }

  private getWaitlist(rowIndex: number): JSX.Element {
    return (<Cell>{this.getWaitlistUnformatted(rowIndex)}</Cell>);
  }

  private getAttribute(rowIndex: number): JSX.Element {
    const courseAttribute = this.classes[rowIndex].courseAttr;
    return (
      <Cell tooltip={courseAttribute}>
        <TruncatedFormat truncateLength={50}>{courseAttribute}</TruncatedFormat>
      </Cell>
    );
  }

  private getCampus(rowIndex: number): JSX.Element {
    return (<Cell>{this.getCampusUnformatted(rowIndex)}</Cell>);
  }

  private getTextbook(rowIndex: number): JSX.Element {
    const _class: IClass = this.classes[rowIndex];
    const textbook = (<><div dangerouslySetInnerHTML={{ __html: _class.textbook }} /></>);
    return (<Cell>{textbook}</Cell>);
  }

  private getDay(rowIndex: number): JSX.Element {
    return (<Cell>{this.getDayUnformatted(rowIndex)}</Cell>);
  }

  private getTime(rowIndex: number): JSX.Element {
    return (<Cell>{this.getTimeUnformatted(rowIndex)}</Cell>);
  }

  private getDayUnformatted(rowIndex: number): string {
    const _class: Class = new Class(this.classes[rowIndex]);
    return _class.getClassMeetingDates();
  }

  private getTimeUnformatted(rowIndex: number) {
    const _class: Class = new Class(this.classes[rowIndex]);
    return _class.getClassMeetingTimes();
  }

  private getModeUnformatted(rowIndex: number) {
    const _class: IClass = this.classes[rowIndex];
    return ClassSearchUtils.getInstructionMode(_class);
  }

  private getSessionUnformatted(rowIndex: number) {
    const _class: IClass = this.classes[rowIndex];
    return ClassSearchUtils.getSessionCode(_class);
  }

  private getSeatsAvailableUnformatted(rowIndex: number) {
    const _class: IClass = this.classes[rowIndex];
    const noOfSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeats(_class);
    return `${noOfSeatsAvailable}/${_class.enrolledCapacity}`;
  }

  private getWaitlistUnformatted(rowIndex: number) {
    const _class: IClass = this.classes[rowIndex];
    const waitlistCapacity = _class.waitlistCapacity;
    const waitlistSeatsAvailable = ClassSearchUtils.getNoOfAvailableSeatsInWaitlist(_class);
    return `${waitlistSeatsAvailable}/${waitlistCapacity}`;
  }

  private getCampusUnformatted(rowIndex: number) {
    const _class: IClass = this.classes[rowIndex];
    return ClassSearchUtils.getCampusName(_class.campus);
  }

  private getObjectKeyNameFromColumnIndex(colIndex: number) {
    const properties = {
      0: 'subject',
      1: 'title',
      2: 'classSection',
      3: 'classNumber',
      4: 'fullSsrComponent',
      5: 'csuUnits',
      6: 'instructorName',
      7: 'meetingDays',
      8: 'meetingTime',
      9: 'instructionMode',
      10: 'sessionCode',
      11: 'seats-available',
      12: 'waitlist',
      13: 'courseAttr',
      14: 'campus',
    };
    return properties[colIndex];
  }

  private getCopiedData(rowIndex: number, columnIndex: number) {
    if (columnIndex === 0) {
      return `${this.classes[rowIndex].subject} ${this.classes[rowIndex].catalogNo}`;
    }
    if (columnIndex === 7) {
      return this.getDayUnformatted(rowIndex);
    }
    if (columnIndex === 8) {
      return this.getTimeUnformatted(rowIndex);
    }
    if (columnIndex === 9) {
      return this.getModeUnformatted(rowIndex);
    }
    if (columnIndex === 10) {
      return this.getSessionUnformatted(rowIndex);
    }
    if (columnIndex === 11) {
      return this.getSeatsAvailableUnformatted(rowIndex);
    }
    if (columnIndex === 12) {
      return this.getWaitlistUnformatted(rowIndex);
    }
    if (columnIndex === 14) {
      return this.getCampusUnformatted(rowIndex);
    }
    const key = this.getObjectKeyNameFromColumnIndex(columnIndex);
    return this.classes[rowIndex][key];
  }
}
