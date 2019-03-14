import { Quarter } from '../src/public/js/Quarter';

describe('test quarter class', () => {

  const json = {
    strm: '0001',
    display_STR: 'Winter 2045',
    displayed_FLAG: 'Y',
    default_FLG: 'Y',
  };

  test('current quarter is set correctly', () => {
    const quarterInst = new Quarter(json);
    const currentQuarterActual = quarterInst.getCurrentQuarter();
    expect(currentQuarterActual).toEqual('Winter 2045');
  });

  test('prev quarter is set correctly when current quarter is winter', () => {
    const quarterInst = new Quarter(json);
    const currentQuarterActual = quarterInst.getPreviousQuarter();
    expect(currentQuarterActual).toEqual('Fall 2044');
  });

  test('prev quarter is set correctly when current quarter is not winter', () => {
    json.display_STR = 'Fall 2099';
    const quarterInst = new Quarter(json);
    const currentQuarterActual = quarterInst.getPreviousQuarter();
    expect(currentQuarterActual).toEqual('Summer 2099');
  });

});
