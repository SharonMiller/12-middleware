'use strict';

import requireAll from 'require-dir';
const models = requireAll('../../models'); //this will require both the cats and dogs

let modelFinder = (req, res, next) => {
  try {
    let model = req && req.params && req.params.model;

    if (model && models[model] && models[model].default) {
      req.model = models[model].default;
      next();
    } else {
      throw 'Model not found';
    }
  } catch (error) {
    throw error;
  }
};

export default modelFinder;

