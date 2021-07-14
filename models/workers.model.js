'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workerSchema = Schema({
    name: String,
    lastname: String,
    role: String,
    department: String,
    age: String,
    phone:String,
    company: [{
        type: Schema.Types.ObjectId, ref: 'companies'
    }]
});

module.exports = mongoose.model('workers', workerSchema);