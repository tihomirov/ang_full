"use strict";
(function () {
  angular.module('myApp.Companies').controller("myApp.Companies.editCompaniesCtrl", ['$scope', 'CompaniesSrv', function ($scope, CompaniesSrv) {

    if ($scope.editCompanyId === 'newCompany') {
      $scope.editCompany = {};
    } else {
      $scope.editCompany = CompaniesSrv.getOneCompanyById($scope.editCompanyId, function (resp) {
        $scope.editCompany = angular.copy(resp);
      });
    }

    $scope.saveCompany = function (form) {

      if (form.$valid) {

        $scope.disabledSave = true;
        var editCompany = $scope.editCompany;

        CompaniesSrv.saveUpdateCompany(editCompany, function (resp) {

          $scope.$emit('scroll-to-new-element', resp._id);

          if (editCompany._id) {
            for (var i = 0; i < $scope.companies.length; i++) {
              if ($scope.companies[i]._id === editCompany._id) {
                $scope.companies[i] = editCompany;
                break;
              }
            }
          } else {
            $scope.companies.push(resp)
          }

          $scope.openCompanyForm();
          $scope.disabledSave = false;
        });
      }
      else {
        $scope.tryToSave = true;
      }
    };

    $scope.isShowErrors = function (form, formFild) {
      return form && form[formFild] && (form[formFild].$dirty || form[formFild].$touched || $scope.tryToSave) && form[formFild].$invalid;
    };

    $scope.isEmailUnique = function(value, model){

      CompaniesSrv.isUniqueMail(value, $scope.editCompany._id || '', function(resp){
        model.$setValidity('unique-email', resp.data);
      });

    };

  }]);


}());
