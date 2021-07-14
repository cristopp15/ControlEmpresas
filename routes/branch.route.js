'use strict'

var express = require('express');
var branchController = require('../controllers/branch.controller');

var api = express.Router();

api.get('/listBranches', branchController.listBranches);

module.exports = api;