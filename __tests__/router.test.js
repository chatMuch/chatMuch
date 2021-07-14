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

describe('testing routes', () => {

  const testUser = {
    username: 'testUser',
    password: 'password',
    role: 'salesPerson',
    token: '',
    id: 1,
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

    // console.log('this is the response.body, ', response.body.user);

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('testUser');
    expect(typeof (response.body.user.password)).toEqual('string');
    expect(response.body.user.role).toEqual('salesPerson');
  });


  // Test /signin
  test('can signin with basic', async () => {

    const response = await request.post('/signin').auth(testUser.username, testUser.password);

    const userObject = response.body.user;
    // console.log('this is the userObject', userObject);

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

    // console.log('this is the userObject.token', testUser.token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(['testUser']);
  });


  // can POST a customer and GET all customers associated with a sales person
  test('can GET and POST to /api/v2/customers associated with a sales person', async () => {
    const newCustomer = await request.post('/api/v2/customers').auth(testUser.token, { type: 'bearer'}).send(testCustomer);
    
    console.log('newCustomer', newCustomer.body);

    //this is getting all accounts associated with salesPerson id: 1
    const response = await request.get('/api/v2/customers/1').auth(testUser.token, { type: 'bearer'});

    console.log('this is the response.body for api/v2/customers', response.body);


    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].salesPerson).toEqual(1);
    expect(response.body[0].name).toEqual('testCustomer');
    expect(response.body[0].jobTitle).toEqual('VP of Perrier');

  });


  test('can update an existing customer', async () => {
    testCustomer.jobTitle = 'VP of San Pellegrino';

    const response = await request.put('/api/v2/customers/1').auth(testUser.token, { type: 'bearer'}).send(testCustomer);
    
    console.log(testCustomer);
    // console.log(response);


    expect(response.status).toBe(202);
    expect(response.body.jobTitle).toEqual('VP of San Pellegrino');

  });


});