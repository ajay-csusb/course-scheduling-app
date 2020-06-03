export class Watchdog {

  public static log(data: any): void {
    fetch(Watchdog.getUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  private static getUrl(): string {
    const baseUrl = window.location.origin;
    const path = '/api/create/log';

    return (baseUrl === null) ? '/api/create/log' : baseUrl + path;
  }
}
