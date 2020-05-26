export class Textbook {

  readonly bookstoreId: number = 1100;
  readonly bookstoreURL: string = 'https://www.bkstr.com/csusanbernardinostore/follett-discover-view/booklook';
  private _term: number;
  private _department: string;
  private _catalogNumber: number;
  private _section: string;

  constructor(term: number, department: string, catalogNumber: number, section: string) {
    this._term = term;
    this._department = department;
    this._catalogNumber = catalogNumber;
    this._section = section;
  }

  get term(): number {
    return this._term;
  }

  set term(term: number) {
    this._term = term;
  }

  get department() {
    return this._department;
  }

  set department(department: string) {
    this._department = department;
  }

  get catalogNumber() {
    return this._catalogNumber;
  }

  set catalogNumber(catalogNumber: number) {
    this._catalogNumber = catalogNumber;
  }

  get section() {
    return this._section;
  }

  set section(section: string) {
    this._section = section;
  }

  public link() {
    return `${this.bookstoreURL}?shopBy=discoverViewCourse&bookstoreId=${this.bookstoreId}&termId=${this._term}&divisionDisplayName=&departmentDisplayName=${this._department}&courseDisplayName=${this._catalogNumber}&sectionDisplayName=${this._section}`;
  }
}
