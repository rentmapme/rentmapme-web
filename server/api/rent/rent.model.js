'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId;

var Apartment = require('../apartment/apartment.model')
var User = require('../user/user.model')

var RentSchema = new Schema({
  leaseStartDate: Date,
  leaseEndDate: Date,
  numBathrooms: Number,
  numBedrooms: Number,
  rentAmount: Number,
  apartment: {type: ObjectId, ref: 'Apartment'},
  review: String,
  floor: String,
  rating: String,
  tip: String,
  user: {type: ObjectId, ref: 'User'},
  creationTime: {type: Date, default: new Date()},
  updateTime: {type: Date, default: new Date()},
  source: String,
  isSpam: {type: Boolean, default: false}

});


//function rangePlugin (schema, options) {
//  schema.add({ minRent: String})
//  schema.add({rentRange: String})
//  schema.pre('save', function (next) {
//    this.lastMod = new Date
//    next()
//  })
//  if (options && options.index) {
//    schema.path('lastMod').index(options.index)
//  }
//}

module.exports = mongoose.model('Rent', RentSchema);
