'use strict';

require('dotenv').config();
const { Sequelize } = require('sequelize');
var sequelize = new Sequelize('postgres', 'dionjwa', process.env.password, {
    host: process.env.host,
    port: 5432,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl:'Amazon RDS'
    // },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
});

sequelize.sync().then (() => {
    console.log('Success');
});
console.log(sequelize.models);

sequelize.query('\dt+').then((rows) => {
    console.log(rows)
});

//define models here. 