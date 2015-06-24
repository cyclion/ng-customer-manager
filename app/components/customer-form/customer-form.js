'use strict';

angular.module('component.customer-form', [
  'mongolab-factory'
]).directive('customerForm', function (mongolabFactory, $state, $stateParams) {
  return {
    templateUrl: 'app/components/customer-form/customer-form.html',
    link: function (scope) {
      scope.currentStateName = $state.current.name;

      scope.customer = {};

      if (scope.currentStateName === 'editCustomer') {
        scope.customer = mongolabFactory.get({id: $stateParams.customerId});
      }

      scope.addCustomer = function () {
        if(!scope.customerForm.$valid) {
          return;
        }

        mongolabFactory.save(scope.customer).$promise.then(function () {
          $state.go('customers');
        });
      };

      scope.updateCustomer = function () {
        if ($stateParams.customerId) {
          mongolabFactory.update({id: scope.customer._id.$oid}, scope.customer).$promise.then(function () {
            $state.go('customers');
          });
        }
      };
    }
  };
});
