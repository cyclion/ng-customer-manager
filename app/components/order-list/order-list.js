'use strict';

angular.module('component.order-list', [
  'mongolab-factory',
  'ui.bootstrap'
]).directive('orderList', function (mongolabFactory, $state) {
  return {
    templateUrl: 'app/components/order-list/order-list.html',
    link: function (scope) {
      scope.customers = mongolabFactory.query();
      scope.viewName = $state.current.name;
      scope.customersSortExpression = ['firstName', 'lastName'];
      scope.customersSortReverse = false;
      scope.ordersSortExpression = 'product';
      scope.ordersSortReverse = false;


      scope.ordersTotalSorter = function (order) {
        return order.quantity * order.unitPrice;
      };

      scope.customersOrdersCountSorter = function (customer) {
        return (customer.orders) ? customer.orders.length : 0;
      };

      scope.customersTotalSorter = function (customer) {
        if (customer.orders) {
          var total = 0;
          customer.orders.forEach(function(order) {
            total += order.quantity * order.unitPrice;
          });
          return total;
        }
        return 0;
      };
    }
  };
});
