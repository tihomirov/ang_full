"use strict";
(function () {
  angular.module('myApp.Companies').controller("myApp.Companies.companyCtrl", ['$scope', 'UsersSrv', 'CompaniesSrv', function ($scope, UsersSrv, CompaniesSrv) {

    $scope.clientsInCompany = $scope.company.clients ? $scope.company.clients.length : 0;

    $scope.companyUsers = $scope.company.clients? CompaniesSrv.getAllUserByCompany($scope.company.clients) : [];

    $scope.deleteCompany = function (editCompany) {
      CompaniesSrv.deleteCompany(editCompany, function (resp) {
        for (var i = 0; i < $scope.companies.length; i++) {
          if ($scope.companies[i]._id === resp._id) {
            $scope.companies.splice($scope.companies.indexOf($scope.companies[i]), 1);
            break;
          }
        }
      });
    };
  }])

}());


