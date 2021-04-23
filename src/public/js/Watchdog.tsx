import { app } from './ClassSearch.d';
export function log(data: any): void {
  fetch(getUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export function logBigQuery(data: any): void {
  let url = app.settings.appBaseUrl + '/export-analytics';
  if (window.location.origin === 'https://www.csusb.edu') {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

function getUrl(): string {
  const baseUrl = window.location.origin;
  const path = '/api/create/log';

  return baseUrl === null ? '/api/create/log' : baseUrl + path;
}
