'use strict'

var express = require('express');
var workerController = require('../controllers/worker.controller');

var api = express.Router();

api.post('/saveWorker', workerController.saveWorker);
api.delete('/:id/deleteWorker', workerController.deleteWorker);
api.put('/:id/updateWorker', workerController.updateWorker);
api.get('/:id/workersNumber', workerController.workersNumber);
api.get('/searchWorker', workerController.searchWorker);
api.get('/generateExcel', workerController.generateExcel);
api.get('/listWorkers', workerController.listWorkers);

module.exports = api;