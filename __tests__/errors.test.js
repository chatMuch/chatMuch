'use strict';

const supertest = require('supertest');
const app = require('../src/server.js');
const request = supertest(app.server);
const { db } = require('../src/models/index.js');


beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});


// tests start here //
describe('testing routes', () => {

});