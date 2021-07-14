'use strict'

var express = require('express');
var companyController = require('../controllers/company.controller');

var api = express.Router();

api.post('/saveCompany', companyController.saveCompany);
api.delete('/:id/deleteCompany', companyController.deleteCompany);
api.put('/:id/updateCompany', companyController.updateCompany);
api.get('/generateExcel', companyController.generateExcel);
api.get('/listCompanies', companyController.listCompanies);




module.exports = api;