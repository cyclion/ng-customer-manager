'use strict';

angular.module('component.navbar', []).directive('navbar', function ($state) {
  return {
    templateUrl: 'app/components/navbar/navbar.html',
    link: function (scope) {
      scope.$watch(function () {
        return $state.current.name;
      }, function (newValue) {
        scope.viewName = newValue;
      });
    }
  };
});
