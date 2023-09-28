'use strict';

require('dotenv').config();
// const app = require('./src/server.js');
const server = require('./src/server.js');
const { db } = require('./src/models/');

db.sync().then(() => {
  server.start(process.env.PORT || 3001);
});
