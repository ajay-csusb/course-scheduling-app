import { Utils } from '../src/public/js/Utils';
import { filterClasses } from '../src/lib/Utils';
import { rawClassesJson } from './ClassesJson';
import _ from 'lodash';

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

describe('filterClasses', () => {
  describe.each(getClasses())('filterClasses(%p, %p)', (a, b, expected) => {
    it(`should return ${expected}`, () => {
      expect(filterClasses(a, b)).toHaveLength(expected);
    });
  })
})

function getClasses() {
  let searchParams = {
    subject: '',
    campus: '',
    catalog_nbr: '',
    name: '',
    class_nbr: '',
    section_code: '',
  }
  let acctClass = _.cloneDeep(rawClassesJson);
  acctClass.name = 'Doe, John';
  acctClass.class_NBR = 1000;
  acctClass.session_CODE = '6W1';
  return [
    [[acctClass], _.defaults({subject: 'ACCT'}, searchParams), 1],
    [[acctClass], _.defaults({subject: 'BIOL'}, searchParams), 0],
    [[acctClass], _.defaults({subject: ''}, searchParams), 1],
    [[acctClass], _.defaults({campus: 'MAIN'}, searchParams), 1],
    [[acctClass], _.defaults({campus: 'PALM'}, searchParams), 0],
    [[acctClass], _.defaults({campus: ''}, searchParams), 1],
    [[acctClass], _.defaults({catalog_nbr: '111B'}, searchParams), 1],
    [[acctClass], _.defaults({catalog_nbr: '111A'}, searchParams), 0],
    [[acctClass], _.defaults({catalog_nbr: ''}, searchParams), 1],
    [[acctClass], _.defaults({name: 'Doe, John'}, searchParams), 1],
    [[acctClass], _.defaults({name: 'Doe, Jane'}, searchParams), 0],
    [[acctClass], _.defaults({name: ''}, searchParams), 1],
    [[acctClass], _.defaults({class_nbr: '1000'}, searchParams), 1],
    [[acctClass], _.defaults({class_nbr: '1001'}, searchParams), 0],
    [[acctClass], _.defaults({class_nbr: ''}, searchParams), 1],
    [[acctClass], _.defaults({section_code: '6W1'}, searchParams), 1],
    [[acctClass], _.defaults({section_code: '6W2'}, searchParams), 0],
    [[acctClass], _.defaults({section_code: ''}, searchParams), 1],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'MAIN'}, searchParams), 1],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'PDC'}, searchParams), 0],
    [[acctClass], _.defaults({subject: 'BIOL', campus: 'MAIN'}, searchParams), 0],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'MAIN', catalog_nbr: '111B'}, searchParams), 1],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'MAIN', catalog_nbr: '111A'}, searchParams), 0],
    [[acctClass], _.defaults({subject: 'ACCT', catalog_nbr: '111B'}, searchParams), 1],
    [[acctClass], _.defaults({subject: 'ACCT', catalog_nbr: '111A'}, searchParams), 0],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'MAIN', catalog_nbr: '111B', name:'Doe, John'}, searchParams), 1],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'MAIN', catalog_nbr: '111B', name:'Doe, Jane'}, searchParams), 0],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'MAIN', catalog_nbr: '111B', name:'Doe, John', class_nbr: '1000'}, searchParams), 1],
    [[acctClass], _.defaults({subject: 'ACCT', campus: 'MAIN', catalog_nbr: '111B', name:'Doe, John', class_nbr: '1001'}, searchParams), 0],
  ]; 
}


