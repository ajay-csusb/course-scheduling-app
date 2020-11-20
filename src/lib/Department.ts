export interface IDepartmentHoursTableInterface extends IHoursListInterface {
  departmentId: string;
  timestamp: string;
}

export interface IDepartmentsTableInterface extends IDepartmentInterface {
  departmentId: string;
  timestamp: string;
}

export interface IHoursListInterface {
  day: string;
  endTime: number;
  startTime: number;
}

export interface IDepartmentInterface {
  building: string;
  division: string;
  email: string;
  faxNumber: string;
  hoursList: IHoursListInterface[];
  mainNumber: string;
  mapLink: string;
  officialName: string;
  path: string;
  room: string;
  title: string;
  website: string;
}

export class Department implements IDepartmentInterface {
  building: string = '';
  division: string = '';
  email: string = '';
  faxNumber: string = '';
  hoursList: IHoursListInterface[] = [
    {
      day: '',
      startTime: 0,
      endTime: 0,
    },
  ];
  mainNumber: string = '';
  mapLink: string = '';
  officialName: string = '';
  path: string = '';
  room: string = '';
  title: string = '';
  website: string = '';

  constructor(department: any) {
    Object.assign(this, department);
  }
}
