// tslint:disable-next-line:max-line-length
export function fetchData(url: string, callbackOnSuccess: (response: any) => void, callbackOnFailure: (error: string) => void): void {
  fetch(url)
      .then((res: Response): object => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Something went wrong during fetching data');
    }
  })
    .then(callbackOnSuccess)
    .catch(callbackOnFailure);
}
