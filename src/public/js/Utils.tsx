import * as React from 'react';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

export class Utils {
  public static loadExternalTools(): void {
    if (Utils.isProd() && !Utils.is_bot()) {
      LogRocket.init('jydmpp/course-schedule-app');
      setupLogRocketReact(LogRocket);
    }
  }

  public static loadBugsnagComponent() {
    const bugsnagClient = bugsnag('a6f6d5125ffe1dc33afdf9d2a68b31da');
    bugsnagClient.use(bugsnagReact, React);
    return bugsnagClient.getPlugin('react');
  }

  public static toCapitalizeCase(str: string): string {
    const wordArr = str.trim().split(' ');
    const results = [];
    for (const word of wordArr) {
      results.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return results.join(' ');
  }

  public static isProd(): boolean {
    return window.location.hostname === 'www.csusb.edu';
  }

  public static is_bot() {
    const url = new URL(window.location.toString());
    const bot = url.searchParams.get('bot');

    return bot !== null && bot === 'true';
  }
}
