import * as ClassSearchUtils from '../src/public/js/ClassSearchUtils';

describe('test localStorage create behavior', () => {
  test('localStorage is created if it is not present', () => {
    ClassSearchUtils.saveOrUpdateLocalStorage('foo', '123');
    expect(localStorage.setItem).toBeCalledWith('foo', '123');
  });

});

describe('test localStorage update behavior', () => {
  // Todo mock implementation of localStorage.getItem(), then proceed to test assertions
  localStorage.mockImplementation('foo', '123');
  test('localStorage is not updated if value it has is same as than the one it receives', () => {
    ClassSearchUtils.saveOrUpdateLocalStorage('foo', '123');
    expect(localStorage.setItem).not.toBeCalledWith('foo', '123');
  });

  test('localStorage is updated if value it stores is older than the one it receives', () => {
    ClassSearchUtils.saveOrUpdateLocalStorage('foo', '456');
    expect(localStorage.setItem).toBeCalledWith('foo', '456');
  });

});
