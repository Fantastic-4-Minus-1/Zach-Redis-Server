const express = require('express');
const Router = express.Router();
const Ctrl = require('../controllers/');

Router.route('/price')
  .post(Ctrl.addPrice);

Router.route('/:company')
  // .all((req, res, next) => {
  //   console.log('hit');
  //   next();
  // })
  .get(Ctrl.fetchCompany)
  .delete(Ctrl.deleteCompany)
  .put(Ctrl.editCompany)
  .post(Ctrl.addCompany);


module.exports = Router;
