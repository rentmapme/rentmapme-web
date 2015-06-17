'use strict';

var _ = require('lodash');
var Apartment = require('./apartment.model');

var longitude_default = -71.11531209999998;
var latitude_default =  42.3614942;

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId


var async = require('async');

Apartment.on('beforeInsert', function(apartment) {
  console.log('A new apartment "%s" was inserted', apartment.streetAddress);
});
// Get list of apartments


exports.adminIndex = function(req,res) {
  Apartment.find().exec(function(err, apartments){
      if (err) handleError(res, err);
      res.json(200, apartments);
  })
}

exports.index = function(req, res) {

  //todo set the distance measure based on the zoom level.......
  //maximum of 20 apartments...
  var limit = req.query.limit === undefined || req.query.limit >10 ? 10 : req.query.limit;
  //offset of the request...
  var offset = req.query.offset === undefined ? 0 : req.query.offset;
  //longitude
  var longitude = req.query.longitude === undefined ? longitude_default : req.query.longitude;
  //latitude
  var latitude = req.query.latitude === undefined ? latitude_default : req.query.latitude;
  // get the max distance or set it to 8 kilometers
  var maxDistance = req.query.distance || 8000;

  // we need to convert the distance to radians
  // the raduis of Earth is approximately 6371 kilometers
  maxDistance /= 6371;

  console.log(limit, offset, latitude, longitude, maxDistance);
  Apartment.count({loc : {
    $near: [longitude, latitude],
    $maxDistance: maxDistance
  }}).exec(function(err, count){

    Apartment.find(
      {
        loc : {
          $near: [longitude, latitude],
          $maxDistance: maxDistance
        }
      })
      .skip(offset)
      .limit(limit)
      .populate('rents')
      .exec(function (err, apartments) {
        if(err) { return handleError(res, err); }
        var response = {
          totalRecords: count,
          apartments: apartments
        };
        return res.json(200, response);
      });

  })

};

//Finds the apartments by location
exports.findByLocation = function(req, res) {
}


// Get a single apartment
exports.show = function(req, res) {
  //console.log(req.params.id);
  Apartment.findById(req.params.id).populate('rents').exec(function (err, apartment) {
    //var response = apartment;
    //response.minBeds = 10;
    //response.minRent =100000;
    //response.maxBeds = 0;
    //response.maxRent = 0
    //console.log(err, apartment);
    if(err) { return handleError(res, err); }
    if(!apartment) { return res.send(404); }

    //console.log(apartment);
    //return res.json(apartment)

    //async.eachSeries(apartment.rents,function(rent, callback){
    //  //console.log(rent);
    //  console.log('here');
    //  response.minBeds = rent.numBedrooms<response.minBeds?rent.numBedrooms:response.minBeds;
    //  response.maxBeds = rent.numBedrooms>response.maxBeds?rent.numBedrooms:response.maxBeds;
    //  response.minRent = rent.rentAmount<response.minRent?rent.numBedrooms:response.minRent;
    //  response.maxRent = rent.rentAmount>response.maxRent?rent.numBedrooms:response.maxRent;

      //console.log(response);
      //callback(apartment, res);
      return res.json(apartment);
    //}, function(err){
    //  console.log(err);
    //})

  });
};

var callback = function(apartment, res) {
  //console.log("callback called");
  //console.log(apartment);
  return res.json(apartment)
}

// Creates a new apartment in the DB.
exports.create = function(req, res) {
  Apartment.create(req.body, function(err, apartment) {
    if(err) { return handleError(res, err); }
    return res.json(201, apartment);
  });
};

// Updates an existing apartment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Apartment.findById(req.params.id).populate("rents").exec(function (err, apartment) {
    console.log(apartment);
    if (err) { return handleError(res, err); }
    if(!apartment) { return res.send(404); }
    var updated = _.merge(apartment, req.body);

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, apartment);
    });
  });
};

// Deletes a apartment from the DB.
exports.destroy = function(req, res) {
  Apartment.findById(req.params.id, function (err, apartment) {
    if(err) { return handleError(res, err); }
    if(!apartment) { return res.send(404); }
    apartment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
