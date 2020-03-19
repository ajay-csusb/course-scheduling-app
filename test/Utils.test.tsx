import { Utils } from '../src/public/js/Utils';

describe('test toCapitalizeCase', () => {
  test('a single word', () => {
    expect(Utils.toCapitalizeCase('foo')).toEqual('Foo');
  });

  test('a sentence', () => {
    expect(Utils.toCapitalizeCase('FOO bar')).toEqual('FOO Bar');
    expect(Utils.toCapitalizeCase('foo bar')).toEqual('Foo Bar');
    expect(Utils.toCapitalizeCase('FOO BAR')).toEqual('FOO BAR');
  });

});
