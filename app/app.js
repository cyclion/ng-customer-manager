'use strict';

angular.module('customerManager', [
  'ui.router',
  'ui.bootstrap',
  'component.navbar',
  'component.customer-list'
]).config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
  $urlMatcherFactoryProvider.strictMode(false);

  $stateProvider
    .state('customers', {
      url: '/',
      template: '<customer-list/>'
    })
  ;
  $urlRouterProvider.otherwise('/');
}).run(function () {
  console.log('run');
})
;
