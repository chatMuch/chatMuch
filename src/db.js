'use strict';

require('dotenv').config();


// let pg = require('pg');
// pg.defaults.ssl = true;

// const { Client } = require('pg')
// const client = new Client()
// client.connect()
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

// const { Sequelize } = require('sequelize');

// const DATABASE_URL = process.env.DATABASE_URL;

// console.log('DB URL', DATABASE_URL);

// let sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect:'postgres',
//     protocol:'postgres',
//     dialectOptions:{
//        ssl:true
//     }
//  });

// sequelize.sync().then (() => {
//     console.log('Success');
// });
// console.log(sequelize.models);

// sequelize.query('\dt+').then((rows) => {
//     console.log(rows)
// });

//define models here. 