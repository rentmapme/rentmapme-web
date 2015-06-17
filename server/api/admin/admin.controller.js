'use strict';

var _ = require('lodash');
var Admin = require('./admin.model');

// Get list of admins


var Apartment = require('../apartment/apartment.model');


var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId


var async = require('async');
var limit = 25;
var offset =  0;





exports.index = function(req, res) {

  //maximum of 20 apartments...
  var limit = req.query.limit === undefined || req.query.limit >25 ? 25 : req.query.limit;
  //offset of the request...
  var offset = req.query.offset === undefined ? 0 : req.query.offset;
  //console.log(limit,offset)

  Apartment.count({}).exec(function(err, count){
    Apartment.find().skip(offset).limit(limit).exec(function(err, apartments){
      if (err) handleError(res, err);
      var response = {
        totalCount: count,
        apartments : apartments
      }
      res.json(200, response);
    })

  });


};

// Get a single apartment with rents populated...
exports.show = function(req, res) {
  Apartment.findById(req.params.id).populate('rents').exec(function (err, apartment) {
    if(err) { return handleError(res, err); }
    if(!apartment) { return res.send(404); }
    return res.json(apartment);
  });
};

// Creates a new admin in the DB.
exports.create = function(req, res) {
  Admin.create(req.body, function(err, admin) {
    if(err) { return handleError(res, err); }
    return res.json(201, admin);
  });
};

// Updates an existing admin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Apartment.findById(req.params.id, function (err, apartment) {
    if (err) { return handleError(res, err); }
    if(!apartment) { return res.send(404); }
    var updated = _.merge(apartment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, apartment);
    });
  });
};

// Deletes a admin from the DB.
exports.destroy = function(req, res) {
  Admin.findById(req.params.id, function (err, admin) {
    if(err) { return handleError(res, err); }
    if(!admin) { return res.send(404); }
    admin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
