"use strict";
(function () {
  angular.module("myApp.Users").service('UsersSrv', ['$http', function ($http) {

    var UsersSrv = {
      saveUpdateUser: saveUpdateUser,
      deleteUser: deleteUser,
      getAllUsers: getAllUsers,
      getOneUserById: getOneUserById,
      isUniqueMail: isUniqueMail
    };

    function saveUpdateUser(editUser, callback) {

      if (!editUser.name && editUser.name > 3) {
        throw 'Name is required'
      } else {

        var user = {
          firstName: editUser.firstName,
          lastName: editUser.lastName,
          company: {_id: editUser.company._id},
          birthDay: Date.parse(editUser.birthDay),
          type: editUser.type,
          mail: editUser.mail
        };


        if(editUser._id){

          return $http.put('/api/users/' + editUser._id, user)
            .then(function (resp) {
              if (callback) {
                callback(resp.data)
              }
            }, function error() {
              return console.log('error');
            })
        } else {

          return $http.post('/api/users', user)
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

    function deleteUser(userId, callback) {

      return $http.delete('/api/users/' + userId)
        .then(function (resp) {
          if(callback){
            callback(resp.data)
          }
        })
    }

    function getAllUsers(callback) {

      return $http.get('/api/users')
        .then(function (resp) {
          if(callback){
            callback(resp.data)
          }
          return resp.data;
        })
    }

    function getOneUserById(userId, callback) {

      return $http.get('/api/users/'+userId)
        .then(function (resp) {
          if(callback){
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

      return $http.post('/api/users/isMailUnique', data)
        .then(function (resp) {
          if (callback) {
            callback(resp)
          }
        }, function () {
          return console.log('error');
        })
    }

    return UsersSrv;
  }]);

})();

