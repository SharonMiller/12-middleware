'use strict';
export default (req, res, next) => {
  res.status(404).json({error: 'Resource not found'});
};