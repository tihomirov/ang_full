/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import async from 'async';
import User from '../api/users/user.model';
import Company from '../api/companies/company.model';

let companies = [
  {
    "name": "Samsung",
    "addressCompany": "Seocho-daero",
    "companyMail": "samsung@mail.com",
    "yearFoundation": 738968400000,
    "clients": []
  },
  {
    "name": "Lenovo",
    "addressCompany": "Apachi",
    "companyMail": "lenovo@mail.com",
    "yearFoundation": 921189600000,
    "clients": []
  },
  {
    "name": "Apple",
    "addressCompany": "Cupertino",
    "companyMail": "apple@mail.com",
    "yearFoundation": 321660000000,
    "clients": []
  }];

let users = [
  {
    "firstName": "Jon",
    "lastName": "Malkovich",
    "birthDay": 478994400000,
    "type": "USER",
    "mail": "jon@mail.com"
  },
  {
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "birthDay": 1459717200000,
    "type": "USER",
    "mail": "petrov@mail.com"
  },
  {
    "firstName": "Petr",
    "lastName": "First",
    "birthDay": 1461925007607,
    "type": "ADMIN",
    "mail": "stpiter@mail.com"
  },
  {
    "firstName": "Miha",
    "lastName": "Moon",
    "birthDay": 999916000000,
    "type": "ADMIN",
    "mail": "moon@mail.com"
  }
];

async.series([
  initCompany,
  setCompanyToUser,
  initUsers,
  setUsersToCompany
]);

function initCompany(callback){
  Company.find({}).remove()
    .then(() => {
      Company.create(companies)
        .then(() => {
          callback();
          return null;
        });

    });
}

function setCompanyToUser(callback){
  Company.find({}).exec()
    .then((res) => {
      companies = res;

      for (let i = 0, len = users.length; i < len; i++) {
        users[i].company = {
          _id: companies[Math.floor(Math.random() * companies.length)]._id
        }
      }

      callback();
      return null;
    })
    .catch(function () {
      throw 'Error'
    });
}

function initUsers(callback){
  User.find({}).remove()
    .then(() => {
      User.create(users)
        .then(() => {
          callback();
          return null;
        });
    });
}

function setUsersToCompany(callback){
  User.find({}).exec()
  .then((res) => {
    users = res;
    var clients = [{_id: users[0]._id}, {_id: users[1]._id}];
    Company.update({}, {clients: clients}, { multi: true }, callback);
  })

}



