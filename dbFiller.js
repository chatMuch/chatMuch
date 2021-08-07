'use strict';

// 3rd party resources
const axios = require('axios');
const faker = require('faker');

// dumm dumm variable
const numberOfCustomers = 3;

const users = [{
  username:'tim',
  password: 'pass',
  role: 'salesPerson'
},{
  username:'dion',
  password: 'pass',
  role: 'salesPerson'
},{
  username:'sunny',
  password: 'pass',
  role: 'salesPerson'
},{
  username:'cullen',
  password: 'pass',
  role: 'salesPerson'
},{
  username:'tyler',
  password: 'pass',
  role: 'salesPerson'
}]

for(let user of users){
  // ! creates 5 new users
  axios.post('http://localhost:3000/signup', user)
    .then( function(response) {
      // ! creates 4 random customers for each salesPerson

      for(let i = 0; i <= numberOfCustomers; i += 1) {
        const { token } = response.data.user;
        const numberOfNotes = Math.floor(Math.random() * 3);

        const customer = {
          salesPerson: response.data.user.id,
          name: faker.name.findName(),
          jobTitle: faker.name.jobTitle(),
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email()
        };

        
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/v2/customers',
          headers: {'Authorization': `Bearer ${token}`},
          data: customer,
        })
          .then( function(response) {
            // ! adds random number of notes to each customer

            for(let k = 0; i <= numberOfNotes; i += 1){
              const note = {
                customerId: response.data.id,
                text: faker.lorem.paragraph()
              };

              axios({
                method: 'post',
                url: 'http://localhost:3000/api/v2/notes',
                headers: {'Authorization': `Bearer ${token}`},
                data: note
              })
                .then( function(response){
                console.log(response.data);
              })
                .catch( function(err) {
                  console.error(err);
                });
            }
          })
          .catch( function(err) {
            console.error(err);
          });
      }
    })
    .catch( function(err) {
      console.error(err);
    });
}