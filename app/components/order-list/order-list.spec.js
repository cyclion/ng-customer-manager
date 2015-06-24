'use strict';

describe('navbar', function () {
  beforeEach(module('templates'));
  beforeEach(module('ui.router'));
  beforeEach(module('mongolab-factory'));
  beforeEach(module('component.order-list'));

  var directive, customers;

  beforeEach(inject(function (directiveBuilder, $httpBackend) {
    customers = [
      {
        '_id': {
          '$oid': '5576c0ece4b0e862e44535f5'
        },
        'firstName': 'Alice',
        'lastName': 'Price',
        'city': 'Cleveland'
      },
      {
        '_id': {
          '$oid': '5577cb2ce4b0af2ef8b7b8b2'
        },
        'firstName': 'Foo',
        'lastName': 'Bar',
        'city': 'Racoon City',
        'orders': [
          {
            'product': 'Test product',
            'quantity': 3,
            'unitPrice': '56',
            'id': 'nvx0ezptt'
          },
          {
            'unitPrice': '2.19',
            'quantity': 2,
            'product': 'Shelf',
            'id': 'y5it1tuvm'
          }
        ]
      }];
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections').respond(customers);
    directive = directiveBuilder.build('<order-list></order-list>');
    directive.scope.$digest();
    $httpBackend.flush();
  }));

  it('element should get compiled', function () {
    expect(directive.element.html()).toBeDefined();
  });

  it('check "ordersTotalSorter" function', function () {
    var value = directive.scope.ordersTotalSorter(customers[1].orders[1]);
    expect(value).toBe(4.38);
  });

  it('check "customersOrdersCountSorter" function', function () {
    var value = directive.scope.customersOrdersCountSorter(customers[0]);
    expect(value).toBe(0);
    value = directive.scope.customersOrdersCountSorter(customers[1]);
    expect(value).toBe(2);
  });

  it('check "customersTotalSorter" function', function () {
    var value = directive.scope.customersTotalSorter(customers[0]);
    expect(value).toBe(0);
    value = directive.scope.customersTotalSorter(customers[1]);
    expect(value).toBe(172.38);
  });
});
