export function fetchData(url: string, callbackOnSuccess: (response: any) => void,
                          callbackOnFailure: (error: string) => void): void {
  fetch(url)
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
