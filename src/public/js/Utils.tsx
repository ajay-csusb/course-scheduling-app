import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

export class Utils {
  public static loadExternalTools(): void {
    if (Utils.isProd()) {
      LogRocket.init('jydmpp/course-schedule-app');
      setupLogRocketReact(LogRocket);
    }
  }

  private static isProd(): boolean {
    return (window.location.hostname === 'www.csusb.edu');
  }

}
