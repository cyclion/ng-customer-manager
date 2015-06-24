'use strict';

describe('order form', function () {
  beforeEach(module('templates'));
  beforeEach(module('ui.router'));
  beforeEach(module('guid-module'));
  beforeEach(module('mongolab-factory'));
  beforeEach(module('component.order-form'));

  var directive, customers;

  beforeEach(inject(function ($httpBackend) {
    customers = [{
      '_id': {
        '$oid': '5576c0ece4b0e862e44535f5'
      },
      'firstName': 'FirstName',
      'lastName': 'LastName',
      'city': 'TestCity'
    }, {
      '_id': {
        '$oid': '5577cb2ce4b0af2ef8b7b8b2'
      },
      'firstName': 'LongFirstName',
      'lastName': 'LongFirstName',
      'city': 'TestCity',
      'orders': [
        {
          'product': 'Test product',
          'quantity': 100,
          'unitPrice': '1.25',
          'id': '456456456'
        },
        {
          'product': 'Test product 2',
          'quantity': 10.5,
          'unitPrice': '100',
          'id': '798789789'
        }
      ]
    }];
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections').respond(customers);
  }));

  it('element should get compiled', inject(function (directiveBuilder, $httpBackend) {
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    $httpBackend.flush();
    expect(directive.element.html()).toBeDefined();

  }));

  it('customer must be selected correct', inject(function (directiveBuilder, $httpBackend, $stateParams) {
    $stateParams.customerId = '5576c0ece4b0e862e44535f5';
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    $httpBackend.flush();
    expect(directive.scope.customerId).toEqual('5576c0ece4b0e862e44535f5');
  }));

  it('order must be selected correct', inject(function (directiveBuilder, $httpBackend, $stateParams) {
    $stateParams.customerId = '5576c0ece4b0e862e44535f5';
    $stateParams.orderId = '456456456';
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections//5576c0ece4b0e862e44535f5').respond(customers[1]);
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    $httpBackend.flush();
    expect(directive.scope.order.product).toEqual('Test product');
  }));

  it('check adding order for orderless customer', inject(function (directiveBuilder, $httpBackend, $stateParams, $state) {
    $stateParams.customerId = '5576c0ece4b0e862e44535f5';
    $stateParams.orderId = undefined;
    spyOn($state, 'go');
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    directive.scope.order = {
      'unitPrice': '4',
      'quantity': 3,
      'product': 'Some_product'
    };
    directive.scope.addOrder();
    var customer;
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections//5576c0ece4b0e862e44535f5').respond(customers[0]);
    $httpBackend.expectPUT('https://api.mongolab.com/api/1/databases//collections//5576c0ece4b0e862e44535f5', function (data) {
      customer = JSON.parse(data);
      return true;
    }).respond(201, '');
    $httpBackend.flush();
    expect($state.go).toHaveBeenCalled();
    expect(customer.orders.length).toBe(1);
  }));

  it('check adding order for customer with 2 orders', inject(function (directiveBuilder, $httpBackend, $stateParams, $state) {
    $stateParams.customerId = '5577cb2ce4b0af2ef8b7b8b2';
    $stateParams.orderId = undefined;
    spyOn($state, 'go');
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    directive.scope.order = {
      'unitPrice': '4',
      'quantity': 3,
      'product': 'Some_product'
    };
    var customer;
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections//5577cb2ce4b0af2ef8b7b8b2').respond(customers[1]);
    $httpBackend.expectPUT('https://api.mongolab.com/api/1/databases//collections//5577cb2ce4b0af2ef8b7b8b2', function (data) {
      customer = JSON.parse(data);
      return true;
    }).respond(201, '');
    directive.scope.addOrder();
    $httpBackend.flush();
    expect($state.go).toHaveBeenCalled();
    expect(customer.orders.length).toBe(3);
  }));

  it('check updateOrder function with correct orderId', inject(function (directiveBuilder, $httpBackend, $stateParams, $state) {
    $stateParams.customerId = '5577cb2ce4b0af2ef8b7b8b2';
    $stateParams.orderId = '456456456';
    $stateParams.backState = 'customerOrders';
    spyOn($state, 'go');
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections//5577cb2ce4b0af2ef8b7b8b2').respond(customers[1]);
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    $httpBackend.flush();
    directive.scope.order.quantity = 5;
    var customer;
    $httpBackend.expectPUT('https://api.mongolab.com/api/1/databases//collections//5577cb2ce4b0af2ef8b7b8b2', function (data) {
      customer = JSON.parse(data);
      return true;
    }).respond(201, '');
    directive.scope.updateOrder();
    $httpBackend.flush();
    expect($state.go).toHaveBeenCalled();
    expect(customer.orders[0].quantity).toBe(5);
  }));

  it('check cancel function if customerId is set', inject(function (directiveBuilder, $httpBackend, $stateParams, $state) {
    $stateParams.customerId = '5576c0ece4b0e862e44535f5';
    $stateParams.orderId = undefined;
    $stateParams.backState = 'customerOrders';
    spyOn($state, 'go');
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    $httpBackend.flush();
    directive.scope.cancel();
    var expectedParams = {customerId: '5576c0ece4b0e862e44535f5'};
    expect($state.go).toHaveBeenCalledWith('customerOrders', expectedParams);
  }));

  it('check cancel function if customerId is not set', inject(function (directiveBuilder, $httpBackend, $stateParams, $state) {
    $stateParams.customerId = undefined;
    $stateParams.orderId = undefined;
    spyOn($state, 'go');
    directive = directiveBuilder.build('<order-form></order-form>');
    directive.scope.$digest();
    $httpBackend.flush();
    directive.scope.cancel();
    expect($state.go).toHaveBeenCalledWith('orders');
  }));
});
