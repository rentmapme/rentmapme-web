/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

var Apartment = require('../api/apartment/apartment.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

//
//id: 2,
//  latitude: 42.3614942,
//  longitude: -71.11531209999998,
//  apartmentCity: "Cambridge",
//  apartmentCounty: "Middlesex",
//  apartmentNeighborhood: null,
//  apartmentState: "MA",
//  apartmentZipcode: null,
//  rents: [ ],
//  apartmentViewCount: 0,
//  apartmentShareCount: 0,
//  apartmentFavoriteCount: 0,
//  apartmentStreetAddress: null,
//  buildingAmenities: {
//  id: 35,
//    hasPool: false,
//    hasGym: false,
//    hasInBuildingLaundry: false,
//    hasCommunityArea: false,
//    hasParking: false,
//    hasIntercomm: false,
//    hasOnSiteRecycling: false,
//    hasBikeStore: false
//},
//apartmentPictures: [ ]

//var ApartmentSchema = new Schema({
//  name: String,
//  info: String,
//  active: Boolean,
//  loc: {
//    type: [Number], //[longitude, latitude]
//    index: '2d'
//  },
//  rents: [{type: ObjectId, ref: 'Rent'}],
//  images:[{type:String}],
//  buildingAmenities: {
//    hasPool: Boolean,
//    hasGym: Boolean,
//    hasInBuildingLaundry: Boolean,
//    hasCommunityArea: Boolean,
//    hasParking: Boolean,
//    hasIntercomm: Boolean,
//    hasOnSiteRecycling: Boolean,
//    hasBikeStore: Boolean
//  },
//  city: String,
//  state: String,
//  zipCode: String,
//  shortURL: String,
//  streetAddress: String,
//  formattedAddress: String,
//  contactInformation: {
//    phoneNumber: String,
//    faxNumber: String,
//    email: String,
//    primaryContactName: String,
//    secondaryContactName: String
//  }
//});


