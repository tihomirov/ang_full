"use strict";
(function () {
  angular.module('myApp.Companies').directive('hoverPopover', ['$compile', '$templateCache', '$templateRequest', "$timeout",
    function ($compile, $templateCache, $templateRequest, $timeout) {

      return {
        restrict: 'A',
        link: function (scope, element) {

          $templateRequest('scripts/core/companies/companies-popover.tpl.html').then(function (template) {
            var compileTemplate = $compile(template)(scope);

            element.popover({
                trigger: "manual",
                placement: 'top',
                animate: true,
                html: true,
                template: compileTemplate,
                title: ' '
              })
            .on("mouseenter", function () {
                var _this = this;
                $(this).popover("show");
                $(".popover").on("mouseleave", function () {
                  $(_this).popover('hide');
                });
              }).on("mouseleave", function () {
              var _this = this;
              $timeout(function () {
                if (!$(".popover:hover").length) {
                  $(_this).popover("hide");
                }
              }, 100);
            });

          }, function () {
            throw ' Template not load'
          });

        }
      }
    }]);
}());
