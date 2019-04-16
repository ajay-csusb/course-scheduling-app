export function fetchData(url: string, callbackOnSuccess: (response: any) => void,
                          callbackOnFailure: (error: string) => void): void {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res: any): any => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Something went wrong during fetching data');
    }
  })
    .then(callbackOnSuccess)
    .catch(callbackOnFailure);
}

export function fetchWithArg(url: string, params: {}, callbackOnSuccess: (response: any) => void,
                             callbackOnFailure: (error: string) => void): void {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((res: any): any => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong during fetching data');
      }
    })
    .then(callbackOnSuccess)
    .catch(callbackOnFailure);
}

export function saveOrUpdateLocalStorage(key: string, value: string): void {
  if (!localStorage.getItem(key) && localStorage.getItem(key) !== value) {
    localStorage.setItem(key, value);
  }
}

export function isObjectEmpty(object: any): boolean {
  return (Object.keys(object).length === 0 && object.constructor === Object);
}

export function getDateIn12HourFormat(date: Date): string {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

export function getDateIn24HourFormat(date: Date): string {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
}

export function compareStartTimes(userTime: string, classTime: string) {
    const [uHour, uMinsWithAmpm] = userTime.split(':');
    const [uMin, uAmpm] = uMinsWithAmpm.split(' ');
    const [cHour, cMinsWithAmpm] = classTime.split(':');
    const [cMin, cAmpm] = cMinsWithAmpm.split(' ');
    const uTime = new Date();
    const cTime = new Date();
    const userInputHour = parseInt(uHour, 10);
    const classInputHour = parseInt(cHour, 10);
    const userInputMin = parseInt(uMin, 10);
    const classInputMin = parseInt(cMin, 10);
    uTime.setHours(userInputHour, userInputMin, 0, 0);
    cTime.setHours(classInputHour, classInputMin, 0, 0);
    if (uAmpm === 'AM' && cAmpm === 'PM') {
      return true;
    }
    if (userInputHour === 12 && uAmpm === 'AM') {
      return true;
    }
    if (userInputHour === 12 && userInputMin === 0  && uAmpm === 'PM' && cAmpm === 'PM') {
      return true;
    }
    if (userInputHour === 12 && userInputMin === 0  && uAmpm === 'PM' && cAmpm === 'AM') {
      return false;
    }
    if (classInputHour === 12 && classInputMin === 0
    && userInputHour < 12 && userInputMin <= 59
    && uAmpm === 'PM' && cAmpm === 'PM') {
      return false;
    }
    if (uTime.getTime() > cTime.getTime()) {
      return false;
    }
    return true;
  }

export function compareEndTimes(userTime: string, classTime: string) {
    const [uHour, uMinsWithAmpm] = userTime.split(':');
    const [uMin, uAmpm] = uMinsWithAmpm.split(' ');
    const [cHour, cMinsWithAmpm] = classTime.split(':');
    const [cMin, cAmpm] = cMinsWithAmpm.split(' ');

    const uTime = new Date();
    const cTime = new Date();
    const userInputHour = parseInt(uHour, 10);
    const classInputHour = parseInt(cHour, 10);
    const userInputMin = parseInt(uMin, 10);
    const classInputMin = parseInt(cMin, 10);
    uTime.setHours(userInputHour, userInputMin, 0, 0);
    cTime.setHours(classInputHour, classInputMin, 0, 0);
    if (cAmpm === 'PM' && uAmpm === 'AM') {
      return false;
    }
    if (uAmpm === 'PM' && cAmpm === 'AM') {
      return true;
    }
    if (userInputHour === 12 && uAmpm === 'AM') {
      return false;
    }
    if (userInputHour === 12 && userInputMin === 0  && uAmpm === 'PM' && cAmpm === 'AM') {
      return true;
    }
    if (userInputHour === 12 && userInputMin === 0  && uAmpm === 'PM' && cAmpm === 'PM') {
      return false;
    }
    if (uTime.getTime() >= cTime.getTime()) {
      return true;
    }
    return false;
  }
