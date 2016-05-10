"use strict";
(function () {
  angular.module('myApp.Users').controller("myApp.Users.usersCtrl", ['$scope', 'UsersSrv',
    function ($scope, UsersSrv) {

    $scope.editUserId = '';
    $scope.query = '';
    $scope.userRole = {
      'ADMIN': 'Admin',
      'USER': 'User'
    };
    $scope.orderUser = {
      predicate: 'firstName',
      reverse: false
    };

    UsersSrv.getAllUsers(function (resp) {
      $scope.users = resp;
    });

    $scope.sortUsers = function (predicate) {
      $scope.orderUser.reverse = ($scope.orderUser.predicate === predicate) ? !$scope.orderUser.reverse : false;
      $scope.orderUser.predicate = predicate;
    };

    $scope.openUserForm = function (userId) {

      if (!userId) {
        $scope.editUserId = '';
      } else if (userId === 'newUser') {
        $scope.editUserId = 'newUser';
      } else {
        $scope.editUserId = userId;
      }
    };

    $scope.filterUsers = function (user) {

      var query = $scope.query.toLowerCase(),
        fullName = user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase() + ' ' + user.mail.toLowerCase();

      return fullName.indexOf(query) !== -1;
    };

  }])

}());


