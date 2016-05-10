"use strict";
(function () {
  angular.module('myApp.Users').directive('scrollTo',
    ['$timeout', function ($timeout) {
      return {

        link: function (scope, element) {

          scope.$on('scroll-to-new-element', function (event, data) {

              $timeout(function () {
                var newElement = element.find('[st-element=\'' + data + '\']');
                var scrollTop = newElement.offset().top;
                window.scrollBy(0, scrollTop);

                newElement.addClass('new-element');
                $timeout(function () {
                  newElement.removeClass('new-element')
                }, 3000);

              }, 0);
            }
          );
        }
      }
    }]);

}());
