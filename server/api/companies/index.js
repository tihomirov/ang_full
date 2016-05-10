'use strict';

var express = require('express');
var controller = require('./company.controller.js');

var router = express.Router();

router.get('/', controller.getAllCompanies);
router.get('/:id', controller.getOneById);
router.delete('/:id', controller.deleteCompany);
router.post('/', controller.createCompany);
router.put('/:id', controller.updateCompany);
router.post('/isMailUnique', controller.isMailUnique);
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);


module.exports = router;
