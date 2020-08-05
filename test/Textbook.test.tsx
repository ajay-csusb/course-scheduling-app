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
    expect(textbook.link()).toEqual(
      'https://www.bkstr.com/webApp/discoverView?bookstore_id-1=1100&term_id-1=111&div-1=&dept-1=foo&course-1=999&section-1=04'
    );
  });

  test('Palm desert bookstore link', async () => {
    textbook.campus = 'PALM';
    expect(textbook.link()).toEqual(
      'https://www.bkstr.com/webApp/discoverView?bookstore_id-1=1101&term_id-1=111&div-1=&dept-1=foo&course-1=999&section-1=04'
    );
  });
});
