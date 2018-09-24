'use strict';

require('babel-register')({
  presets: [ 'env'],
});

require('dotenv').config();
// require('./src/app.js').start(process.env.PORT);

const app = require('./src/app');
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});