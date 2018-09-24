'use strict';
const request = require('supertest');
const app = require('../../src/app');

describe('API post with data', () => {
  it('should return data with id when asked good cat data', (done) => {
    let cat = {
      "name": "fluffy",
      "age": 9
    }
    request(app)
      .post('/api/v1/cats')
      .send(cat)
      .expect(200)
      .end((req, res) => {
    
        console.log(res.body);
        done();
      });
  } );

});