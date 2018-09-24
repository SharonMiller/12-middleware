'use strict';

import fs from 'fs';

const debug = require('debug')('storage');

const storage = {};

const dataDirectory = `${__dirname}/data`;

let readFilePromise = function (filename) {
  debug(`readFilePromise ${filename}`);
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, function (err, data) {
      if (err)
        reject(err);
      else
        resolve(data);
    });

  });
};

storage.getAll = () => {
  debug('getting all');
  return new Promise((resolve, reject) => {
    //getting all the files in our data directory
    fs.readdir(dataDirectory, (err, files) => {
      if (err) { reject(err); }
      let promises = [];
      //loop through files and push calls to readfilepromise into an array of promises
      while (files.length) {
        let file = files.shift();
        file = `${dataDirectory}/${file}`;
        if (file.match(/\.json/)) { promises.push(readFilePromise(file)); }
      }

      //if there are promises in the array, the following code will execute when they are al done. 'contents' will then be in an array, with each entry in it beign the 'resolved' data from each of the promisses in the array.

      Promise.all(promises)
        .then(contents => {
          let database = contents.reduce((db, data) => {
            let obj = JSON.parse(data.toString());
            db[obj.id] = obj;
            return db;
          }, {});
          resolve(database);
        })
        .catch(console.log);
    });
  });
};

storage.get = (id) => {
  debug(`getting ${id}`);
  return new Promise( (resolve,reject) => {
    let file = `${dataDirectory}/${id}.json`;
    fs.readFile(file, (err,data) => {
      if ( data ) {
        let obj = JSON.parse(data.toString());
        resolve(obj);
      }
      else { reject(`${id} not found`); }
    });
  });
};

storage.save = (data) => {
  console.log('in save on filesystem.js')
  debug(`saving ${JSON.stringify(data)}`);
  return new Promise( (resolve,reject) => {
    if ( ! data.id ) { reject('No ID Specified'); }

    let file = `${dataDirectory}/${data.id}.json`;
    let text = JSON.stringify(data);
    fs.writeFile( file, text, (err) => {
      if(err) { reject(err); }
      resolve(data);
    });
  });
};

export default storage;