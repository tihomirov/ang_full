"use strict";
(function () {
  angular.module('myApp.Users').directive('uniqueEmail', ["UsersSrv", "CompaniesSrv",
    function () {
      return {
        restrict: "A,E",
        require: "ngModel",
        scope: {
          uniqueEmail: "="
        },
        link: function (scope, element, attributes, ctrl) {

          scope.$watch(function () {
            return ctrl.$viewValue
          }, function () {

            if (ctrl.$viewValue) {
              scope.uniqueEmail(ctrl.$viewValue, ctrl);
            }
          });

        }
      };
    }
  ]);

}());
