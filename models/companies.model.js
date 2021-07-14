'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = Schema({
    name: String,
    location: String,
    phone: Number,
    username: String,
    email: String,
    password: String  

});

module.exports = mongoose.model('companies', companySchema);