export function filterClassesByPageNumberAndLimit(classes: JSX.Element[], page: number, limit: number): JSX.Element[] {
  let startIndex = Math.max(0, (page - 1) * limit);
  if (startIndex > classes.length) {
    startIndex = Math.max(0, classes.length - limit);
  }
  const endIndex = limit !== -1 ? startIndex + limit : 1000000;
  return classes.slice(startIndex, endIndex);
}