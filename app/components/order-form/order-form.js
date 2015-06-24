'use strict';

angular.module('component.order-form', [
  'mongolab-factory',
  'guid-module'
]).directive('orderForm', function (mongolabFactory, $state, $stateParams, guidGenerator, $filter) {
  return {
    templateUrl: 'app/components/order-form/order-form.html',
    link: function (scope) {
      scope.currentStateName = $state.current.name;

      mongolabFactory.queryData().$promise.then(function(customers) {
        //console.log(customers[0].firstName);
        var orderedCustomers = $filter('orderBy')(customers, ['firstName', 'lastName']);
        //console.log(orderedCustomers[0].firstName);
        scope.customers = orderedCustomers;
      });

      scope.order = {};
      if ($stateParams.customerId) {
        scope.customerId = $stateParams.customerId;
        if ($stateParams.orderId) {
          scope.customer = mongolabFactory.get({id: scope.customerId}, function () {
            scope.customer.orders.forEach(function(order) {
              if (order.id === $stateParams.orderId) {
                scope.order = order;
              }
            });
          });
        }
      }

      scope.addOrder = function () {
        var customer = mongolabFactory.get({id: scope.customerId}, function () {
          if (!customer.orders) {
            customer.orders = [];
          }
          scope.order.id = guidGenerator.newGuid();
          customer.orders.push(scope.order);
          mongolabFactory.update({id: customer._id.$oid}, customer).$promise.then(function () {
            scope.cancel();
          });
        });
      };

      scope.updateOrder = function () {
        scope.customer.orders.forEach(function(order, orderIndex) {
          if (order.id === scope.order.id) {
            scope.customer.orders.splice(orderIndex, 1, scope.order);
            mongolabFactory.update({id: scope.customer._id.$oid}, scope.customer).$promise.then(function () {
              scope.cancel();
            });
          }
        });
      };

      scope.cancel = function () {
        if ($stateParams.customerId) {
          $state.go($stateParams.backState, {customerId: $stateParams.customerId});
        } else {
          $state.go('orders');
        }
      };
    }
  }
    ;
})
;
