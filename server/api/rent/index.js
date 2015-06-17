'use strict';

var express = require('express');
var controller = require('./rent.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

//rents for the user..
router.get('/', auth.isAuthenticated(),  controller.index);
//particular rent for the user
router.get('/:id',auth.isAuthenticated(), controller.show);
//add a new rent
router.post('/',auth.isAuthenticated(), controller.create);
//change an existing rent
router.put('/:id', auth.isAuthenticated(), controller.update);

router.patch('/:id', auth.isAuthenticated(), controller.update);
//remove an entry ..
router.delete('/:id',auth.isAuthenticated(), controller.destroy);


//

module.exports = router;
