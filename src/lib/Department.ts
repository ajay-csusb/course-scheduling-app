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
  title: string = '';
  division: string = '';
  officialName: string = '';
  building: string = '';
  room: string = '';
  email: string = '';
  path: string = '';
  website: string = '';
  mapLink: string = '';
  mainNumber: string = '';
  faxNumber: string = '';
  hoursList: IHoursListInterface[] = [
    {
      day: '',
      startTime: 0,
      endTime: 0,
    },
  ];

  constructor(department: any) {
    Object.assign(this, department);
  }
}
