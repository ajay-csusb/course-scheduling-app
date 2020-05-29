import fetchMock from 'fetch-mock';
import { rawClassesJson} from './ClassesJson';

export class TestUtils {
  public static ajax(): void {
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList', {});
    fetchMock.mock('https://webdx.csusb.edu/FacultyStaffProfileDrupal/cs/getAllCST', {});
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getCurrentCS', rawClassesJson);
    fetchMock.mock('/null/api/create/log', {});
    fetchMock.mock('https://dev-dot-csusb-class-schedule.df.r.appspot.com/export-to-excel', {a: "b", c: "d"});
  }

  public static copyObject(sourceObject: any): any {
    return JSON.parse(JSON.stringify(sourceObject));
  }
}
