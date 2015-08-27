'use strict';

angular.module('customerManager', [
  'ui.router',
  'ui.bootstrap',
  'component.navbar',
  'component.customer-list',
  'mongolab-factory',
  'component.customer-form',
  'component.customer-orders-page',
  'component.order-form',
  'component.order-list'
]).config(function (mongolabFactoryProvider) {
  mongolabFactoryProvider.setConfigs({
    dataBase: 'task2',
    collection: 'customers',
    apiKey: 'dn-hNjuX1bXbXhTWDbpXperdbFi7YiU1'
  });
}).config(function($locationProvider){
  // use the HTML5 History API
  //$locationProvider.html5Mode(true);
})
  .config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
  $urlMatcherFactoryProvider.strictMode(false);

  $stateProvider
    .state('customers', {
      url: '/',
      template: '<customer-list/>'
    })
    .state('addCustomer', {
      url: '/customers/add',
      template: '<customer-form></customer-form>'
    })
    .state('editCustomer', {
      url: '/customers/:customerId/edit',
      template: '<customer-form></customer-form>'
    })
    .state('customerOrders', {
      url: '/customers/:customerId/orders',
      template: '<customer-orders-page></customer-orders-page>'
    })
    .state('addOrderCustomer', {
      url: '/customers/:customerId/orders/add',
      template: '<order-form></order-form>',
      params: {backState: 'customerOrders'}
    })
    .state('editOrder', {
      url: '/customers/:customerId/orders/:orderId/edit',
      template: '<order-form></order-form>',
      params: {backState: 'customers'}
    })
    .state('orders', {
      url: '/orders',
      template: '<order-list></order-list>'
    })
    .state('addOrder', {
      url: '/orders/add',
      template: '<order-form></order-form>'
    })
  ;
  $urlRouterProvider.otherwise('/');
}).run(function () {
  console.log('run');
})
;
