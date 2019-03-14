export declare var currentQuarterId: string;
export class Quarter {

  private currentQuarter: string;
  private prevQuarter: string;

  public constructor(data: any) {
    this.currentQuarter = '';
    this.prevQuarter = '';
    this.calculateCurrentQuarter(data);
    this.calculatePrevQuarter(data);
  }

  public static getQuarterId(uQuarter: string): string | null {
    const baseId = 2190;
    let currentId = 2192;
    const baseYear = 2019;
    let quarter = localStorage.getItem('currentQuarter');
    if (uQuarter === 'prev') {
      quarter = localStorage.getItem('prevQuarter');
    }
    if (quarter === null || quarter === undefined) {
      return null;
    }
    const term = quarter.split(' ')[0];
    const year = parseInt(quarter.split(' ')[1], 10);
    const diffYear = year - baseYear;
    if (diffYear > 0) {
      return null;
    }
    currentId = baseId + (10 * diffYear);
    if (term === 'Winter') {
      currentId = currentId + 2;
    }
    if (term === 'Spring') {
      currentId = currentId + 4;
    }
    if (term === 'Summer') {
      currentId = currentId + 6;
    }
    if (term === 'Fall') {
      currentId = currentId + 8;
    }
    return currentId.toString();
  }

  public static getCurrentQuarterId(): string {
    return currentQuarterId;
  }

  public static setCurrentQuarterId(quarter: string) {
    if (!currentQuarterId) {
      currentQuarterId = quarter;
    }
  }

  public getCurrentQuarter(): string {
    return this.currentQuarter;
  }

  public getPreviousQuarter(): string {
    return this.prevQuarter;
  }

  private calculateCurrentQuarter(data: any): void {
    this.currentQuarter = data.display_STR;
  }

  private calculatePrevQuarter(data: any): void {
    const term = data.display_STR.split(' ')[0];
    const year = data.display_STR.split(' ')[1];
    if (term === 'Winter') {
      this.prevQuarter = 'Fall ' + (parseInt(year, 10) - 1);
    }
    if (term === 'Spring') {
      this.prevQuarter = 'Winter ' + year;
    }
    if (term === 'Summer') {
      this.prevQuarter = 'Spring ' + year;
    }
    if (term === 'Fall') {
      this.prevQuarter = 'Summer ' + year;
    }
  }

}
