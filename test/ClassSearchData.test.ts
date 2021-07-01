
/**
 * @jest-environment node
 */
import request from 'supertest';
import app from '../src/app';
import { TestUtils } from './TestUtils';

describe('when we receive a response status code > 400 from fetch', () => {

  beforeAll(() => {
    TestUtils.ajax();
    jest.setTimeout(30000);
  });
  it('should call the function that receives data from Firestore', (done) => {
    const res = request(app)
      .post('/get-class-search-data')
      .send({strm: '2008'})
      .set("Access-Control-Allow-Origin", '*')
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
});
