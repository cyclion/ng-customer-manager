'use strict';

angular.module('component.customer-list', [
  'ui.bootstrap'
]).directive('customerList', function (mongolabFactory, $modal) {
  return {
    templateUrl: 'app/components/customer-list/customer-list.html',
    link: function (scope) {
      scope.sortExpression = ['firstName', 'lastName'];
      scope.sortReverse = false;
      scope.customers = mongolabFactory.query();

      scope.orderCountSorter = function (customer) {
        return (customer.orders) ? customer.orders.length : 0;
      };

      scope.deleteCustomer = function (customer) {
        scope.customerName = customer.firstName + ' ' + customer.lastName;

        scope.deleteConfirmDialog = $modal.open({
          templateUrl: 'app/components/customer-list/delete-confirm-dialog.html',
          scope: scope,
          size: 'md'
        });

        scope.deleteConfirmDialog.result.then(function () {
          scope.customers.splice(scope.customers.indexOf(customer), 1);
          mongolabFactory.remove({id: customer._id.$oid});
        });
      };
    }
  };
});
