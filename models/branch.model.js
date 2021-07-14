'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchSchema = Schema({
    name: String,
    location: String,
    company: [{
        type: Schema.Types.ObjectId, ref: 'companies'
    }]

});

module.exports = mongoose.model('branches', branchSchema);