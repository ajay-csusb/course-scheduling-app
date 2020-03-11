import * as React from 'react';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

export class Utils {
  public static loadExternalTools(): void {
    if (Utils.isProd()) {
      LogRocket.init('jydmpp/course-schedule-app');
      setupLogRocketReact(LogRocket);
    }
  }

  public static loadBugsnagComponent() {
    const bugsnagClient = bugsnag('a6f6d5125ffe1dc33afdf9d2a68b31da');
    bugsnagClient.use(bugsnagReact, React);
    return bugsnagClient.getPlugin('react');
  }

  private static isProd(): boolean {
    return (window.location.hostname === 'www.csusb.edu');
  }

}
