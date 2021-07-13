'use strict';

const supertest = require('supertest');
const app = require('../src/server.js');
const request = supertest(app.server);
const { db } = require('../src/models/index.js');
// const userModel = require('../src/models/auth/users.js');

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('testing user things', () => {
  const testUser = {
    username: 'testUser',
    password: 'password',
    role: 'salesPerson',
    token: '',
    // id: 1,
  };

  const testCustomer = {
    salesPerson: 1,
    // id: 1,
    name: 'testCustomer',
    email: 'testcustomer@aol.gov',
    phone: '555-555-5555',
    jobTitle: 'VP of Perrier',

  };

  // Test POST/signup request
  test('testing POST request to create a new user', async () => {
    let response = await request.post('/signup').send(testUser);

    console.log('this is the response.body, ', response.body.user);

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('testUser');
    expect(typeof (response.body.user.password)).toEqual('string');
    expect(response.body.user.role).toEqual('salesPerson');
  });


  // Test /signin
  test('can signin with basic', async () => {

    const response = await request.post('/signin').auth(testUser.username, testUser.password);

    const userObject = response.body.user;
    console.log('this is the userObject', userObject);

    testUser.token = userObject.token;

    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.username).toBeDefined();
    expect(userObject.username).toEqual(response.body.user.username);

  });


  // can GET a list of users
  test('can GET to /users', async () => {
    const response = await request.get('/users')
      .auth(testUser.token, { type: 'bearer' });

    console.log('this is the userObject.token', testUser.token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(['testUser']);
  });

  
  // can GET to all customers associated with a sales person
  test('can GET to /api/v2/customers associated with a sales person', async () => {
    const response = await request.post('/api/v2/customers/1').send(testCustomer);


    console.log('this is the response.body', response.body);
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.salesPerson).toEqual(1);
    expect(response.body.name).toEqual('testCustomer');
    expect(response.body.jobTitle).toEqual('VP of Perrier');

  });

});