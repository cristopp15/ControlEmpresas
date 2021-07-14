'use strict'

var express = require('express');
var productController = require('../controllers/product.controller');

var api = express.Router();

api.get('/generatePDF', productController.generatePDF);


module.exports = api;