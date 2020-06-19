import * as React from 'react';
import * as ClassSearchUtils from './ClassSearchUtils';
import { IClass, Class } from './Class';
import { Cell, Table, Column, ColumnHeaderCell, IMenuContext,
  CopyCellsMenuItem, TruncatedFormat } from '@blueprintjs/table';
import { Menu, MenuItem } from '@blueprintjs/core';
import * as Sort from './Sort';
export interface ITableDisplayProps {
  classes: IClass[];
}

export class Grid extends React.Component<ITableDisplayProps> {

  private classes: IClass[];

  constructor(props: ITableDisplayProps) {
    super(props);
    this.classes = this.props.classes;
    this.getCopiedData = this.getCopiedData.bind(this);
    this.renderBodyMenu = this.renderBodyMenu.bind(this);
  }
  public render(): JSX.Element {
    const innerColumns = [
      [this.subjectColumnHeader.bind(this), this.getSubject.bind(this)],
      [this.titleColumnHeader.bind(this), this.getTitle.bind(this)],
      [this.sectionColumnHeader.bind(this), this.getSection.bind(this)],
      [this.classNumberColumnHeader.bind(this), this.getClassNumber.bind(this)],
      [this.typeColumnHeader.bind(this), this.getType.bind(this)],
      [this.unitColumnHeader.bind(this), this.getUnit.bind(this)],
      [this.instructorColumnHeader.bind(this), this.getInstructor.bind(this)],
      [this.roomColumnHeader.bind(this), this.getRoom.bind(this)],
      [this.dayColumnHeader.bind(this), this.getDay.bind(this)],
      [this.timeColumnHeader.bind(this), this.getTime.bind(this)],
      [this.seatsAvailableColumnHeader.bind(this), this.getSeatsAvailable.bind(this)],
      [this.waitlistColumnHeader.bind(this), this.getWaitlist.bind(this)],
      [this.instructionModeColumnHeader.bind(this), this.getMode.bind(this)],
      [this.sessionCodeColumnHeader.bind(this), this.getSession.bind(this)],
      [this.courseAttrColumnHeader.bind(this), this.getAttribute.bind(this)],
      [this.campusColumnHeader.bind(this), this.getCampus.bind(this)],
      [this.feeColumnHeader.bind(this), this.getFee.bind(this)],
      [this.textbookColumnHeader.bind(this), this.getTextbook.bind(this)],
    ];
    const columns = [];
    const heightVal = (this.classes.length > 200) ? '500px' : '100%';

    for (const innerColumn of innerColumns) {
      columns.push(
        <Column
          key={innerColumn[0].name}
          columnHeaderCellRenderer={innerColumn[0]}
          cellRenderer={innerColumn[1]}
        />
      );
    }

    return (
      <div style={{height: heightVal}}>
        <Table
          key={new Date().getTime()} // Hack! https://github.com/palantir/blueprint/issues/3757
          numRows={this.classes.length}
          enableColumnResizing={false}
          getCellClipboardData={this.getCopiedData}
          bodyContextMenuRenderer={this.renderBodyMenu}
          columnWidths={[100, 300, 50, 70, 90, 30, 150, 70, 70, 130, 60, 70, 140, 70, 300, 110, 60, 80]}
        >
          {columns}
        </Table>
      </div>
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
    return (
      <ColumnHeaderCell
        name={'Waitlist Seats Available'}
        menuRenderer={() => this.columnMenu('waitlistTotal')}
      />
    );
  }

  private courseAttrColumnHeader() {
    return (<ColumnHeaderCell name={'Attribute'} menuRenderer={() => this.columnMenu('courseAttr')} />);
  }

  private campusColumnHeader() {
    return (<ColumnHeaderCell name={'Campus'}  menuRenderer={() => this.columnMenu('campus')}/>);
  }

  private feeColumnHeader() {
    return (<ColumnHeaderCell name={'Fee'} menuRenderer={() => this.columnMenu('fee')} />);
  }

  private textbookColumnHeader() {
    return (<ColumnHeaderCell name={'Textbook'} />);
  }

  private roomColumnHeader() {
    return (<ColumnHeaderCell name={'Building'} menuRenderer={() => this.columnMenu('buildingCode')}/>);
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

  private sortBuildingNumber(key: string) {
    this.classes = (key === 'asc') ? Sort.sortByBuildingNumber(this.classes, key)
    : Sort.sortByBuildingNumber(this.classes, key);
    this.forceUpdate();
  }
  private columnMenu(id: string = 'subject'): JSX.Element {
    let menuItems = <></>;
    const callbacks = {
      subject: {
        use_id: false,
        cb: this.sortSubject.bind(this),
      },
      title: {
        use_id: true,
        cb: this.sortByString.bind(this),
      },
      fullSsrComponent: {
        use_id: true,
        cb: this.sortByString.bind(this),
      },
      instructorName: {
        use_id: true,
        cb: this.sortByString.bind(this),
      },
      buildingCode: {
        use_id: false,
        cb: this.sortBuildingNumber.bind(this),
      },
      courseAttr: {
        use_id: true,
        cb: this.sortByString.bind(this),
      },
      classNumber: {
        use_id: true,
        cb: this.sortByNumber.bind(this),
      },
      csuUnits: {
        use_id: true,
        cb: this.sortByNumber.bind(this),
      },
      classSection: {
        use_id: true,
        cb: this.sortByNumber.bind(this),
      },
      campus: {
        use_id: false,
        cb: this.sortCampus.bind(this),
      },
      instructionMode: {
        use_id: false,
        cb: this.sortInstructionMode.bind(this),
      },
      sessionCode: {
        use_id: false,
        cb: this.sortSessionCode.bind(this),
      },
      classStartTime: {
        use_id: false,
        cb: this.sortMeetingTime.bind(this),
      },
      meetingDays: {
        use_id: false,
        cb: this.sortMeetingDays.bind(this),
      },
      enrolledTotal: {
        use_id: true,
        cb: this.sortSeatsAvailable.bind(this),
      },
      waitlistTotal: {
        use_id: true,
        cb: this.sortSeatsAvailable.bind(this),
      },
      fee: {
        use_id: true,
        cb: this.sortByNumber.bind(this),
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
    const topic = ClassSearchUtils.formatSubjectTopic(_class.topic);
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

  private getFee(rowIndex: number): JSX.Element {
    const fee = this.getFeeUnformatted(rowIndex);

    if (fee !== '0.00') {
      return (<Cell>${fee}</Cell>);
    }

    return (<Cell />);
  }

  private getTextbook(rowIndex: number): JSX.Element {
    const _class: IClass = this.classes[rowIndex];
    const textbookUrl = ClassSearchUtils.getTextbookUrl(_class);
    const {subject, catalogNo} = _class;
    return (
      <Cell>
        <a href={textbookUrl} target="_blank">
          <span className="sr-only">{subject} {catalogNo}</span>
          Textbook
      </a>
      </Cell>
    );
  }

  private getDay(rowIndex: number): JSX.Element {
    return (<Cell>{this.getDayUnformatted(rowIndex)}</Cell>);
  }

  private getTime(rowIndex: number): JSX.Element {
    return (<Cell>{this.getTimeUnformatted(rowIndex)}</Cell>);
  }

  private getRoom(rowIndex: number): JSX.Element {
    return (<Cell>{this.getRoomUnformatted(rowIndex)}</Cell>);
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

  private getRoomUnformatted(rowIndex: number) {
    const _class: IClass = this.classes[rowIndex];
    return ClassSearchUtils.getRoomNumber(_class);
  }

  private getFeeUnformatted(rowIndex: number): string {
    return this.classes[rowIndex].fee;
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
      7: 'buildingCode',
      8: 'meetingDays',
      9: 'meetingTime',
      10: 'seats-available',
      11: 'waitlist',
      12: 'instructionMode',
      13: 'sessionCode',
      14: 'courseAttr',
      15: 'campus',
      16: 'fee',
    };
    return properties[colIndex];
  }

  private getCopiedData(rowIndex: number, columnIndex: number) {
    if (columnIndex === 0) {
      return `${this.classes[rowIndex].subject} ${this.classes[rowIndex].catalogNo}`;
    }
    if (columnIndex === 7) {
      return this.getRoomUnformatted(rowIndex);
    }
    if (columnIndex === 8) {
      return this.getDayUnformatted(rowIndex);
    }
    if (columnIndex === 9) {
      return this.getTimeUnformatted(rowIndex);
    }
    if (columnIndex === 10) {
      return this.getSeatsAvailableUnformatted(rowIndex);
    }
    if (columnIndex === 11) {
      return this.getWaitlistUnformatted(rowIndex);
    }
    if (columnIndex === 12) {
      return this.getModeUnformatted(rowIndex);
    }
    if (columnIndex === 13) {
      return this.getSessionUnformatted(rowIndex);
    }
    if (columnIndex === 15) {
      return this.getCampusUnformatted(rowIndex);
    }
    const key = this.getObjectKeyNameFromColumnIndex(columnIndex);
    return this.classes[rowIndex][key];
  }

}
