import request from 'supertest';
import app from '../src/app';
import { classJson, classPDC } from './ClassesJson';

describe('Export to Excel endpoint', () => {
  it('should have the content-type of application/octet-stream', (done) => {
    const res = request(app)
      .post('/export-to-excel')
      .send([classJson, classPDC])
      .expect(200)
      .expect('Content-Type', 'application/octet-stream')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        done();
      });
  });

  it('should send a status of 400 if the request is not valid', (done) => {
    const res = request(app)
      .post('/export-to-excel')
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
});

