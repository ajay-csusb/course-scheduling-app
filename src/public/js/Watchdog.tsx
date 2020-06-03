export function log(data: any): void {
  fetch(getUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function getUrl(): string {
  const baseUrl = window.location.origin;
  const path = '/api/create/log';

  return (baseUrl === null) ? '/api/create/log' : baseUrl + path;
}
