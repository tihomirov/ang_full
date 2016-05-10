'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getOneById);
router.delete('/:id', controller.deleteUser);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.post('/isMailUnique', controller.isMailUnique);

module.exports = router;
