import { Textbook } from '../src/public/js/Textbook';

describe('Textbook', () => {
  let textbook: Textbook;
  beforeAll(() => {
    textbook = new Textbook(111, 'foo', 999, '04', 'MAIN');
  });

  test('constructor', () => {
    expect(textbook.term).toEqual(111);
    expect(textbook.department).toEqual('foo');
    expect(textbook.catalogNumber).toEqual(999);
    expect(textbook.section).toEqual('04');
    expect(textbook.bookstoreId).toEqual(1100);
  });

  test('link', () => {
    expect(textbook.link()).toEqual('https://www.bkstr.com/csusanbernardinostore/follett-discover-view/booklook?shopBy=discoverViewCourse&bookstoreId=1100&termId=111&divisionDisplayName=&departmentDisplayName=foo&courseDisplayName=999&sectionDisplayName=04');
  });

});
