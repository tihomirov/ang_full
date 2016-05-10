'use strict';

import _ from 'lodash';
import Company from './company.model.js';

export {getAllCompanies, getOneById, deleteCompany, createCompany, updateCompany, isMailUnique}

function getAllCompanies(req, res) {
  return Company.find().exec()
    .then(_respondWithResult(res))
    .catch(_handleError(res));
}

function getOneById(req, res) {
  return Company.findById(req.params.id).exec()
    .then(_respondWithResult(res))
    .catch(_handleError(res));
}

function deleteCompany(req, res) {
  return Company.findById(req.params.id).exec()
    .then(_handleEntityNotFound(res))
    .then(_removeEntity(res))
    .catch(_handleError(res));
}

function createCompany(req, res) {
  return Company.create(req.body)
    .then(_respondWithResult(res, 201))
    .catch(_handleError(res));
}

function updateCompany(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return Company.findById(req.params.id).exec()
    .then(_handleEntityNotFound(res))
    .then(_saveUpdates(req.body))
    .then(_respondWithResult(res))
    .catch(_handleError(res));
}

function isMailUnique(req, res) {

  Company.find({mail: req.body.mail}).exec()
    .then((query) => {

      if (!query || query.length === 0) {
        res.status(200).json(true);
        return null;
      }

      if (query.length === 1) {
        if (req.body.id && (query[0]._id == req.body.id)) {
          res.status(200).json(true);
          return null;
        }
      }

      res.status(200).json(false);
      return null;
    })
}

function _saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function _removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
          return null;
        });
    }
  };
}

function _handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function _respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
    return null;
  };
}

function _handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}
