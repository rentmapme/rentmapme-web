'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId

var Rent = require('../rent/rent.model')

var findOrCreate = require('mongoose-findorcreate')


var ApartmentSchema = new Schema({
  name: String,
  loc: {
    type: [Number], //[longitude, latitude]
    index: '2d'
  },
  rents: [{type: ObjectId, ref: 'Rent'}],
  images:[{type:String}],
  buildingAmenities: {
    pool: {type: Boolean, default: false},
    gym: {type: Boolean, default: false},
    inBuildingLaundry: {type: Boolean, default: false},
    communityArea: {type: Boolean, default: false},
    parking: {type: Boolean, default: false},
    intercomm: {type: Boolean, default: false},
    onSiteRecycling: {type: Boolean, default: false},
    bikeStore: {type: Boolean, default: false},
    cats: {type: Boolean, default: false},
    dogs: {type: Boolean, default: false}

  },
  apartmentAmenities: {
    microwave: {type: Boolean, default: false},
    fridge: {type: Boolean, default: false},
    inUnitLaundry: {type: Boolean, default: false},
    airConditioning: {type: Boolean, default: false},
    hardwoodFloors: {type: Boolean, default: false},
    balcony: {type: Boolean, default: false}
  },
  city: String,
  county: String,
  state: String,
  zipCode: String,
  shortURL: String,
  streetAddress: String,
  formattedAddress: String,
  neighborhood: String,
  contactInformation: {
    phoneNumber: String,
    faxNumber: String,
    email: String,
    primaryContactName: String,
    secondaryContactName: String,
    website: String
  },
  minRent: {type: Number, default: 100000},
  maxRent: {type: Number, default: -1},
  minBedrooms: {type: Number, default: 100000},
  maxBedrooms: {type: Number, default: -1},
  updateTime: {type: Date, default: new Date()}

});


ApartmentSchema.plugin(findOrCreate);


ApartmentSchema.post( 'save', function() {
  console.log('post save called');
  console.log(this);
  //this._original = this.toObject();
} );


ApartmentSchema.pre('save', function(next){
  console.log('pre save called');
  console.log(this);
  next();
})

ApartmentSchema.pre('update', function(next){
  console.log('pre update called');
  console.log(this);
  next();
})
module.exports = mongoose.model('Apartment', ApartmentSchema);
