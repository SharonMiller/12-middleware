'use strict';

require('babel-register')({
  presets: [ 'env'],
});

require('dotevn').config();
require('./src/app.js').start(process.env.PORT);