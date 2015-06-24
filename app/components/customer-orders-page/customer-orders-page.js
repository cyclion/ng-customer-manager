'use strict';

angular.module('component.customer-orders-page', [
  'mongolab-factory',
  'component.customer-orders-list'
]).directive('customerOrdersPage', function (mongolabFactory, $stateParams, $state) {
  return {
    templateUrl: 'app/components/customer-orders-page/customer-orders-page.html',
    link: function (scope) {
      scope.viewName = $state.current.name;
      scope.sortExpression = 'product';
      scope.sortReverse = false;
      scope.customer = mongolabFactory.get({id: $stateParams.customerId});
      scope.totalSorter = function (order) {
        return order.quantity * order.unitPrice;
      };
    }
  };
});
