export class Textbook {
  readonly bookstoreURL: string = 'https://www.bkstr.com/webApp/discoverView';
  private _bookstoreId: number = 1100;
  private _term: number;
  private _department: string;
  private _catalogNumber: string;
  private _section: string;
  private _campus: string;

  constructor(term: number, department: string, catalogNumber: string, section: string, campus: string) {
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

  set catalogNumber(catalogNumber: string) {
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

    return `${this.bookstoreURL}?bookstore_id-1=${this.bookstoreId}&term_id-1=${this._term}&div-1=&dept-1=${this._department}&course-1=${this._catalogNumber}&section-1=${this._section}`;
  }
}
