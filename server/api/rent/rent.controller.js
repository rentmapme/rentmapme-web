'use strict';

var _ = require('lodash');
var Rent = require('./rent.model');
var Apartment = require('../apartment/apartment.model');
var User = require('../user/user.model');
var validator = require('validator');
var async = require('async')
var ObjectId = require('mongoose').Schema.ObjectId;


// Get list of rents
exports.index = function(req, res) {
  Rent.find(function (err, rents) {
    if(err) { return handleError(res, err); }
    return res.json(200, rents);
  });
};

// Get a single rent
exports.show = function(req, res) {

  Rent.findById(req.params.id, function (err, rent) {
    if(err) { return handleError(res, err); }
    if(!rent) { return res.send(404); }
    return res.json(rent);
  });
};

// Creates a new rent in the DB.
exports.create = function(req, res) {
  console.log('creating rent');
  var validationResp =  validateParams(req);

  //console.log(req.user);
  //console.log(req.body);
  if (validationResp.errors!==undefined && validationResp.errors!=null && validationResp.errors.length!=0) {
    res.send(validationResp);
  } else{
    console.log('validparams');
    Apartment.findOrCreate({loc: req.body.loc},
      { loc: req.body.loc,
        city: req.body.city,
        state: req.body.state,
        streetAddress: req.body.streetAddress
      }, function(err, apartment, created) {
      // created will be true here
      console.log('A new apartment created? ' + created + " apartment " + apartment);
      Rent.create(req.body.rent, function(err, rent) {
        if(err) { return handleError(res, err); }
        console.log('rent created');
        rent.apartment = apartment;
        rent.user = req.user;
        rent.save(function(err){
          //console.log('saved rent with _id' + rent._id);
          Apartment.findByIdAndUpdate(apartment._id, {$push : {rents: rent}
            //,
            //$min: {minRent : rent.rentAmount},
            //$max: {maxRent: rent.rentAmount}
          }, {safe: true, upsert: true}, function(err, apartment){
            console.log('apartment updated ');
            //console.log(apartment);

            User.findByIdAndUpdate(req.user._id, {$push: {rents: rent}}, {safe: true, upsert: true}, function(err, user){
              //console.log('user updated');
              Rent.populate(rent,'apartment', function(err, rent){
                //console.log(rent);
                return res.json(201, rent)
              })
              //return res.json(201, rent);
            })
          })

        })
      });


    });
    //Rent.create(req.body, function(err, rent) {
    //  if(err) { return handleError(res, err); }
    //  return res.json(201, rent);
    //});
  }

};

// Updates an existing rent in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Rent.findById(req.params.id, function (err, rent) {
    if (err) { return handleError(res, err); }
    if(!rent) { return res.send(404); }
    var updated = _.merge(rent, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, rent);
    });
  });
};

// Deletes a rent from the DB.
exports.destroy = function(req, res) {
  Rent.findById(req.params.id, function (err, rent) {
    console.log('rent found ' + req.params.id);
    if(err) { return handleError(res, err); }
    if(!rent) { return res.send(404); }
    User.findByIdAndUpdate(req.user._id,
      {$pull: {'rents': req.params.id }}, function (err, user) {


        //console.log('user updated');
        //console.log(user, err);
        if (err) return handleError(res, err);
        if (user==undefined|| !user) return res.send(404)
        Apartment.findOneAndUpdate({"rents": req.params.id}, {$pull: {'rents': req.params.id }}).exec(function(err, apartments){
          console.log("found apartment");
          console.log(err, apartments);
          return res.send(204)
        })
      })
    //  //console.log(user);
    //  if (err) { return handleError(res, err); }
    //  if (!user) { return res.send(404); }
    //  user.rents.forEach(function(rentItem){
    //    console.log('item id ' + rentItem, " id rnet " + rent._id)
    //
    //    //if (rentItem === rent._id){
    //      console.log('matched');
    //      rent.remove(function(err) {
    //        console.log('here');
    //        if(err) { return handleError(res, err); }
    //        user.update({$pull: {rents: {_id: ObjectId(rent._id)}}},function(err){
    //          console.log('user update? ');
    //          return res.send(204);
    //        })
    //      });
    //    //}
    //  })
    //
    //})

  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function validateParams(req) {
  //console.log(req);
  req.checkBody('loc', 'Parameter loc required').notEmpty();
  req.checkBody('city', 'Parameter city required').notEmpty();
  req.checkBody('state', 'Parameter state required').notEmpty();
  req.checkBody('zipCode', 'Parameter zipCode required').notEmpty();
  req.checkBody('streetAddress', 'Parameter streetAddress required').notEmpty();
  req.checkBody('county', 'Parameter county required').notEmpty();
  //req.checkBody('rents', 'Parameter rents required and should be an array').notEmpty();
  console.log(req.body.rents);



  //req.checkBody('rents.leaseStartDate', 'Parameter county required').notEmpty();


  //req.checkBody('messages', 'Parameter messages required').notEmpty();
  var errors = req.validationErrors();
  if (errors===undefined || errors===null) {
    errors = [];
  }
  if (req.body.rent===undefined) {

    errors.push({param: "rent", msg: "Parameter rent is required and should be an non empty array"})
  } else {

    var rentAmount = req.body.rent.rentAmount;
    var leaseStartDate = req.body.rent.leaseStartDate;
    var leaseEndDate = req.body.rent.leaseEndDate;
    var numBathrooms = req.body.rent.numBathrooms;
    var numBedrooms = req.body.rent.numBedrooms;
    var review = req.body.rent.review;
    var rating = req.body.rent.rating;

    if (rentAmount===undefined|| !validator.isNumeric(rentAmount) ){
      errors.push({param: "rentAmount", msg: "Parameter rentAmount is required and should be an number"})
    }

    if (numBathrooms===undefined|| !validator.isNumeric(numBathrooms) ){
      errors.push({param: "numBathrooms", msg: "Parameter numBathrooms is required and should be an number"})
    }

    if (numBedrooms===undefined|| !validator.isNumeric(numBedrooms) ){
      errors.push({param: "numBedrooms", msg: "Parameter numBedrooms is required and should be an number"})
    }

    //if (leaseEndDate===undefined||!validator.isDate(leaseEndDate)){
    //  errors.push({param: "leaseEndDate", msg: "Parameter leaseEndDate is required and should be an date"})
    //
    //}
    //
    //if (leaseStartDate===undefined||!validator.isDate(leaseStartDate)){
    //  errors.push({param: "leaseStartDate", msg: "Parameter leaseStartDate is required and should be an date"})
    //}

    if (rating===undefined|| !validator.isNumeric(rating) ){
      errors.push({param: "rating", msg: "Parameter rating is required and should be an number"})
    }

    if (review===undefined ){
      errors.push({param: "review", msg: "Parameter review is required"})
    }




  }
  //if (req.body.rents!=undefined) {
  //  console.log("here");
  //  if (req.body.rents.rentAmount === undefined) {
  //    errors.push({param: "rentAmount",msg: "Parameter rentAmount is required"})
  //  }
  //
  //}
  console.log('errors: ' + JSON.stringify(errors));
  return {
    errors: errors
  }
}
// Rent management related activities
exports.addRent = function(req, res) {

}

exports.deleteRent  = function(req, res) {

}

exports.putRent = function(req, res) {

}

