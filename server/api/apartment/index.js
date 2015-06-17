'use strict';

var express = require('express');
var controller = require('./apartment.controller');

var auth = require('../../auth/auth.service');


var router = express.Router();

var Apartment = require('../apartment/apartment.model');

var longitude_default = -71.11531209999998;
var latitude_default =  42.3614942;

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId


var async = require('async');

//Apartment.on('beforeInsert', function(apartment) {
//  console.log('A new apartment "%s" was inserted', apartment.streetAddress);
//});
// Get list of apartments


exports.adminIndex = function(req,res) {
  Apartment.find().exec(function(err, apartments){
    if (err) handleError(res, err);
    res.json(200, apartments);
  })
}



router.get('/', controller.index);
router.get('/allApartments',  auth.hasRole('admin'), controller.adminIndex);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
