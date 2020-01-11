import fetchMock from 'fetch-mock';
import { rawClassesJson} from './ClassesJson';

export class TestUtils {
  public static ajax(): void {
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getDropDownList', {});
    fetchMock.mock('https://webdx.csusb.edu/FacultyStaffProfileDrupal/cs/getAllCST', {});
    fetchMock.mock('https://webdx.csusb.edu/ClassSchedule/v2/getCurrentCS', rawClassesJson);
    fetchMock.mock('*', {});
  }
}
