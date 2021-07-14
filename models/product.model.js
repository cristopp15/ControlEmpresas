'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
        name: String,
        expiration: String,
        quality: String,
        stock: Number,
        price: String,
        branch: [{  
            type: Schema.Types.ObjectId, ref: 'branches'
        }]

})

module.exports = mongoose.model('products', productSchema)