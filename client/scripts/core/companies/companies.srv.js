"use strict";
(function () {
  angular.module("myApp.Companies").service('CompaniesSrv', ['$http','UsersSrv', function ($http, UsersSrv) {

    var CompaniesSrv = {
      getAllUserByCompany: getAllUserByCompany,
      saveUpdateCompany: saveUpdateCompany,
      deleteCompany: deleteCompany,
      getAllCompanies: getAllCompanies,
      getOneCompanyById: getOneCompanyById,
      isUniqueMail: isUniqueMail
    };

    function getAllUserByCompany(clients) {
      var companyClients = [];
        for (var j = 0, l = clients.length; j < l; j++) {
          UsersSrv.getOneUserById(clients[j], function (resp) {
            companyClients.push({firstName: resp.firstName, lastName: resp.lastName});
          });
        }

        return companyClients
      }

      function saveUpdateCompany(editCompany, callback) {

        if (!editCompany.name && editCompany.name > 3) {
          throw 'Name is required'
        } else {

          var company = {
            name: editCompany.name,
            addressCompany: editCompany.addressCompany,
            companyMail: editCompany.companyMail,
            yearFoundation: Date.parse(editCompany.yearFoundation),
            clients: editCompany.clients
          };

          if (editCompany._id) {

            return $http.put('/api/companies/' +  editCompany._id, company)
              .then(function (resp) {
                if (callback) {
                  callback(resp.data)
                }
              }, function error() {
                return console.log('error');
              })

          } else {

            return $http.post('/api/companies', company)
              .then(function (resp) {
                if (callback) {
                  callback(resp.data)
                }
              }, function error() {
                return console.log('error');
              })
          }


        }
      }

      function deleteCompany(removeCompany, callback) {

        return $http.delete('/api/companies/' + removeCompany._id)
          .then(function (resp) {
            if (callback) {
              callback(resp.data)
            }
          })
      }

      function getAllCompanies(callback) {

        return $http.get('/api/companies')
          .then(function (resp) {
            if (callback) {
              callback(resp.data)
            }
            return resp.data;
          })
      }

      function getOneCompanyById(companyId, callback) {

        return $http.get('/api/companies/' + companyId)
          .then(function (resp) {
            if (callback) {
              callback(resp.data)
            }
            return resp.data;
          })
      }

    function isUniqueMail(email, id, callback){
      var data = {
        mail: email,
        id: id
      };

      return $http.post('/api/companies/ismailunique', data)
        .then(function (resp) {
          if (callback) {
            callback(resp)
          }
        }, function () {
          return console.log('error');
        })
    }

      return CompaniesSrv;
    }

    ]);

})();

