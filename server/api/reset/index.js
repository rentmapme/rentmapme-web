'use strict';

var express = require('express');
var controller = require('./reset.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/:token', controller.show);
router.post('/:token', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
