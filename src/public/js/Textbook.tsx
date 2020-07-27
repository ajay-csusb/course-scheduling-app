export class Textbook {
  readonly bookstoreURL: string = 'https://www.bkstr.com/csusanbernardinostore/follett-discover-view/booklook';
  private _bookstoreId: number = 1100;
  private _term: number;
  private _department: string;
  private _catalogNumber: number;
  private _section: string;
  private _campus: string;

  constructor(term: number, department: string, catalogNumber: number, section: string, campus: string) {
    this._term = term;
    this._department = department;
    this._catalogNumber = catalogNumber;
    this._section = section;
    this._campus = campus;
  }

  set term(term: number) {
    this._term = term;
  }

  set section(section: string) {
    this._section = section;
  }

  set campus(campus: string) {
    this._campus = campus;
  }

  set department(department: string) {
    this._department = department;
  }

  set catalogNumber(catalogNumber: number) {
    this._catalogNumber = catalogNumber;
  }

  set bookstoreId(bookstoreId: number) {
    this._bookstoreId = bookstoreId;
  }

  get term(): number {
    return this._term;
  }

  get department() {
    return this._department;
  }

  get catalogNumber() {
    return this._catalogNumber;
  }

  get section() {
    return this._section;
  }

  get campus() {
    return this._campus;
  }

  get bookstoreId() {
    return this._bookstoreId;
  }

  public link() {
    if (this._campus.toLowerCase() === 'palm') {
      this._bookstoreId = 1101;
    }

    return `${this.bookstoreURL}?shopBy=discoverViewCourse&bookstoreId=${this.bookstoreId}&termId=${this._term}&divisionDisplayName=&departmentDisplayName=${this._department}&courseDisplayName=${this._catalogNumber}&sectionDisplayName=${this._section}`;
  }
}
