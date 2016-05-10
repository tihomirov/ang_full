"use strict";
(function () {
  angular.module('myApp').directive('datePicker',
    function () {

      return {
        restrict: "A",
        require: 'ngModel',
        scope: {},
        link: function (scope, element, attr, ctrl) {

          var datePickerInput = element.find('[date-picker-input]');

          datePickerInput.datepicker({
            format: "dd.mm.yyyy"
          }) .on('changeDate', function(event){
            ctrl.$setViewValue(event.date)
          });

          var listener = scope.$watch(function () {
            return ctrl.$viewValue
          }, function (val) {
            if (!val) return;

            datePickerInput.datepicker("setDate", new Date(+val));
            listener()

          });

        }
      };
    });

}());
