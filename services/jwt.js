'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'llaveEncriptada';

exports.createToken = (companies)=>{
    var payload = {
        sub: companies._id,
        name: companies.name,
        location: companies.location,
        phone: companies.phone,
        username: companies.username,
        email: companies.email,
        password: companies.password,
        iat:  moment().unix(),
        exp: moment().add(15, "days").unix()
    }
    return jwt.encode(payload, key);
}