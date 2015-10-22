'use strict';

var express = require('express');
var controller = require('./rate.controller');

var router = express.Router();

router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);

module.exports = router;
