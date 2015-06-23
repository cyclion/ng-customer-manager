'use strict';

angular.module('component.customer-list', [
  'ui.bootstrap'
]).directive('customerList', function () {
  return {
    templateUrl: 'app/components/customer-list/customer-list.html',
    link: function (scope) {

    }
  };
});
