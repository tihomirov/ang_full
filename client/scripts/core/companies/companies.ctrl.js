"use strict";
(function () {
  angular.module('myApp.Companies').controller("myApp.Companies.companiesCtrl", ['$scope', 'CompaniesSrv',
    function ($scope, CompaniesSrv) {

    $scope.query = '';
    $scope.editCompanyId = '';

    $scope.orderCompany = {
      predicate: '',
      reverse: false
    };

    CompaniesSrv.getAllCompanies(function(resp){
      $scope.companies = resp;
    });


    $scope.sortCompanies = function (predicate) {
      $scope.orderCompany.reverse = ($scope.orderCompany.predicate === predicate) ? !$scope.orderCompany.reverse : false;
      $scope.orderCompany.predicate = predicate;
    };

    $scope.openCompanyForm = function (companyId) {
      if (!companyId) {
        $scope.editCompanyId = '';
      } else if (companyId === 'newCompany') {
        $scope.editCompanyId = 'newCompany';
      } else {
        $scope.editCompanyId = companyId;
      }
    };

    $scope.filterCompanies = function (company) {

      var query = $scope.query.toLowerCase(),
        fullName = company.name.toLowerCase() + ' ' + company.addressCompany.toLowerCase() + ' ' + company.companyMail.toLowerCase();

      return fullName.indexOf(query) !== -1;

    };

  }]);

}());


