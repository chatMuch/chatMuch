'use strict';

const supertest = require('supertest');
const app = require('../src/server.js');
const request = supertest(app.server);
const { db } = require('../src/models/index.js');
const ioClient = require('socket.io-client');
const http = require('http');
const ioBackend = require('socket.io');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;


beforeAll(async () => {
  await db.sync();
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.address();
  ioServer = ioBackend(httpServer);
});

afterAll(async () => {
  await db.drop();
  ioServer.close();
  httpServer.close();
});


// ROUTE tests and Error tests start here //
describe('testing routes', () => {

  const testUser = {
    id: 1,
    username: 'testUser',
    password: 'password',
    role: 'salesPerson',
    token: '',
  };

  const testUser2 = {
    id: 2,
    username: 'Account Manager',
    password: 'password',
    // role: 'NONE',
    token: '',
  };

  const testCustomer = {
    salesPerson: 1,
    name: 'testCustomer',
    email: 'testcustomer@aol.gov',
    phone: '555-555-5555',
    jobTitle: 'VP of Perrier',
  };

  const testCustomer2 = {
    salesPerson: 1,
    name: 'testCustomer2',
    email: 'testcustomer2@aol.net',
    phone: '999-999-9999',
    jobTitle: 'President of Topo Chico',
  };

  const testCustomer3 = {
    salesPerson: 1,
    name: 'testCustomer3',
    email: 'testcustomer3@aol.io',
    phone: '111-111-1111',
    jobTitle: 'Unemployed',
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
    const newCustomers = await request.post('/api/v2/customers')
      .auth(testUser.token, { type: 'bearer' })
      .send(testCustomer);

    const newCustomers2 = await request.post('/api/v2/customers')
      .auth(testUser.token, { type: 'bearer' })
      .send(testCustomer2);


    console.log('😎 newCustomers', newCustomers.body, newCustomers2.body);

    //this is getting all accounts associated with salesPerson id: 1
    const response = await request.get('/api/v2/customers/1').auth(testUser.token, { type: 'bearer' });

    console.log('all customers for salesperson 1:', response.body);


    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].salesPerson).toEqual(1);
    expect(response.body[0].name).toEqual('testCustomer');
    expect(response.body[0].jobTitle).toEqual('VP of Perrier');

  });


  // PUT request, updates customer
  test('can update an existing customer', async () => {
    testCustomer.jobTitle = 'VP of San Pellegrino';

    const response = await request.put('/api/v2/customers/1').auth(testUser.token, { type: 'bearer' }).send(testCustomer);

    console.log('PUT for testCustomer', testCustomer);
    // console.log(response);


    expect(response.status).toBe(202);
    expect(response.body.jobTitle).toEqual('VP of San Pellegrino');

  });


  // DELETE, deletes customer
  test('can DELETE an existing customer', async () => {
    let response = await request.delete('/api/v2/customers/1')
      .auth(testUser.token, { type: 'bearer' });

    console.log('🌳 response body for delete:', response.body);

    expect(response.status).toBe(202);
    expect(response.body.name).toBe('testCustomer');

    response = await request.get('/api/v2/customers/1').auth(testUser.token, { type: 'bearer' });

    console.log('😏 post delete', response.body);
    expect(response.body.length).toBe(1);

  });



  // === === 404 on a bad route === === //
  test('Testing 404 on a bad route', async () => {
    const response = await request.get('/badroute');

    expect(response.status).toEqual(404);
  });


  // === === 404 on a bad method === === //
  test('Testing 404 on a bad method', async () => {
    const response = await request.put('/customer');

    expect(response.status).toEqual(404);
  });


  // === === 500 if accessing users without being logged in === === //
  test('500 if accessing users without being logged in', async () => {
    const response = await request.get('/users');

    expect(response.status).toEqual(500);
  });


  // === === 500 if accessing customers without being logged in === === //
  test('500 if accessing customers without being logged in', async () => {
    const response = await request.get('/api/v2/customers');

    expect(response.status).toEqual(500);
  });


  // // ACL 403, invalid credentials
  // test('ACL 403 invalid credentials', async () => {

  //   //AM signup
  //   let response = await request.post('/signup').send(testUser2);
  //   console.log('😁 response body', response.body);

  //   //AM signin
  //   response = await request.post('/signin').auth(testUser2.username, testUser2.password);
  //   console.log('🤑 post signin', response.body);

  //   // AM customer GET attempt
  //   response = await request.get('/api/v2/customers/1').auth(testUser2.token, { type: 'bearer' });
  //   console.log('customer get', response.body)


  // AM customer POST attempt
  // const newCustomers = await request.post('/api/v2/customers')
  //   .auth(testUser2.token, { type: 'bearer' })
  //   .send(testCustomer3);

  // console.log('🥱AM new customer attempt', newCustomers.body);


  // AM customer PUT attempt
  // testCustomer.jobTitle = 'Unemployed';
  // response = await request.put('/api/v2/customers/1').auth(testUser.token, { type: 'bearer' }).send(testCustomer);




  //   expect(response.status).toEqual(403);
  // });

});

describe('testing socket.io', () => {

  beforeEach((done) => {
    socket = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      done();
    })
  })

  test('should connect and communicate', (done) => {
    ioServer.emit('echo', 'Hello from ioServer');
    socket.once('echo', (res) => {
      expect(res).toBe('Hello from ioServer');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    })
  });

  // afterEach((done) => {
  //   if (socket.connected) {
  //     socket.disconnect();
  //   }
  //   done();
  // });

  // beforeEach((done) => {
  //   socket = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
  //     'reconnection delay': 0,
  //     'reopen delay': 0,
  //     'force new connection': true,
  //     transports: ['websocket'],
  //   });
  //   socket.on('connect', () => {
  //     done();
  //   })
  // })

  test('should communicate with waiting for socket.io handshakes', (done) => {
    socket.emit('example', 'some messages');
    setTimeout((message) => {
      ioServer.on('connection', (mySocket) => {
        expect(mySocket).toBeDefined();
      })
      done();
    }, 50);
  });

  afterEach((done) => {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });


});