'use strict';

angular.module('component.customer-orders-list', [

]).directive('customerOrdersList', function ($modal, mongolabFactory) {
  return {
    templateUrl: 'app/components/customer-orders-list/customer-orders-list.html',
    scope: {
      customer : '=',
      sortExpression : '=',
      sortReverse : '=',
      backState : '='
    },
    link: function (scope) {
      scope.deleteOrder = function (customer, order) {
        scope.customerName = customer.firstName + ' ' + customer.lastName;
        scope.order = order;

        scope.deleteConfirmDialog = $modal.open({
          templateUrl: 'app/components/customer-orders-list/delete-confirm-dialog.html',
          scope: scope,
          size: 'lg'
        });

        scope.deleteConfirmDialog.result.then(function () {
          scope.total = 0;
          scope.customer.orders.forEach(function(order, orderIndex) {
            if (order.id === scope.order.id) {
              scope.customer.orders.splice(orderIndex, 1);
              mongolabFactory.update({id: customer._id.$oid}, customer);
            } else {
              scope.total += order.quantity * order.unitPrice;
            }
          });
        });
      };
    }
  };
});
