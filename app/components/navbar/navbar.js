'use strict';

angular.module('component.navbar', []).directive('navbar', function ($state) {
  return {
    templateUrl: 'app/components/navbar/navbar.html',
    link: function (scope) {
    }
  };
});
