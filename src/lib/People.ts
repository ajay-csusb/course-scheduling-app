export interface IPeopleTableInterface extends IPeopleInterface {
  timestamp: string;
}

export interface IPeopleInterface {
  building: string;
  campus: string;
  deptName: string;
  email: string;
  fName: string;
  jobTitle: string;
  lName: string;
  path: string;
  pubExt: string;
  room: string;
}

export class People implements IPeopleInterface {
  building: string = '';
  campus: string = '';
  deptName: string = '';
  email: string = '';
  fName: string = '';
  jobTitle: string = '';
  lName: string = '';
  path: string = '';
  pubExt: string = '';
  room: string = '';

  constructor(people: any) {
    Object.assign(this, people);
  }
}
