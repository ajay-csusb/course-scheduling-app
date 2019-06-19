export class MeetingDay {

  private _monday: boolean = false;
  private _tuesday: boolean = false;
  private _wednesday: boolean = false;
  private _thursday: boolean = false;
  private _friday: boolean = false;
  private _saturday: boolean = false;
  private _sunday: boolean = false;

  constructor(mon: string, tue: string, wed: string, thu: string, fri: string, sat: string, sun: string) {
    this._monday = (mon === 'Y');
    this._tuesday = (tue === 'Y');
    this._wednesday = (wed === 'Y');
    this._thursday = (thu === 'Y');
    this._friday = (fri === 'Y');
    this._saturday = (sat === 'Y');
    this._sunday = (sun === 'Y');
  }

  get monday(): boolean {
    return this._monday;
  }

  get tuesday(): boolean {
    return this._tuesday;
  }

  get wednesday(): boolean {
    return this._wednesday;
  }

  get thursday(): boolean {
    return this._thursday;
  }

  get friday(): boolean {
    return this._friday;
  }

  get saturday(): boolean {
    return this._saturday;
  }
  get sunday(): boolean {
    return this._sunday;
  }

}
