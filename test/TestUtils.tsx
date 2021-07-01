import fetchMock from 'fetch-mock';
import { IClass } from '../src/public/js/Class';
import { rawClassesJson, classJson, classPDC } from './ClassesJson';

export class TestUtils {
  public static ajax(): void {
    let resultClasses: IClass[] = [];
    let hours = 9;
    let minutes = 10;
    for (let index = 0; index < 52; index++) {
      const copyRawClassesJson = TestUtils.copyObject(rawClassesJson);
      copyRawClassesJson.class_NBR = index;
      copyRawClassesJson.subject = 'ENG';
      copyRawClassesJson.enrl_STAT = 'Open';
      copyRawClassesJson.class_STAT = 'Active';
      copyRawClassesJson.meeting_TIME[0].class_START_TIME = `${hours} : ${minutes} PM`;
      copyRawClassesJson.meeting_TIME[0].class_END_TIME = `${hours} : ${minutes + 1} PM`;
      minutes += 1;
      resultClasses.push(copyRawClassesJson);
    }

    fetchMock.mock('https://csusb-class-schedule.df.r.appspot.com/get-class-search-options', {});
    fetchMock.mock('/get-class-search-options', {});
    fetchMock.mock('/null/api/create/log', {});
    fetchMock.mock('end:/export-to-excel', { status: 200, body: { a: 'b', c: 'd' } });
    fetchMock.mock('end:/export-analytics', { status: 200, body: { foo: 'foo', bar: 'bar' } });
    fetchMock.mock(
    (url, opts) => {
        return (
          url === '/get-class-search-data' &&
          opts &&
          opts.body &&
          opts.body.toString().includes('CHEM')
        );
      },
      500,
      { method: 'POST', overwriteRoutes: true }
    );
    fetchMock.mock('/get-class-search-data', rawClassesJson);
  }
  
  public static copyObject(sourceObject: any): any {
    return JSON.parse(JSON.stringify(sourceObject));
  }
}
