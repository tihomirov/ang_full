"use strict";
(function () {
  var app = angular.module("myApp", ["myApp.Users", "myApp.Companies", "ui.router", 'ngMessages', 'ui.bootstrap', 'ngAnimate']);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/users');

      $stateProvider
        .state('users', {
          url: "/users",
          controller: "myApp.Users.usersCtrl",
          templateUrl: "scripts/core/users/users.tpl.html"
        })

        .state('companies', {
          url: "/companies",
          controller: "myApp.Companies.companiesCtrl",
          templateUrl: 'scripts/core/companies/companies.tpl.html'
        });
    }]);

  app.run(function ($rootScope) {

    $rootScope.getUserName = function(user, isEmail){
      if(!user){
        return '';
      }

      var userFullName = user.firstName + ' ' + user.lastName;

      if(isEmail) {
        userFullName += user.mail;
      }

      return userFullName;
    };

  });

})();
