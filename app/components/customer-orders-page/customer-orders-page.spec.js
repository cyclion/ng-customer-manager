'use strict';

describe('navbar', function () {
  beforeEach(module('templates'));
  beforeEach(module('ui.router'));
  beforeEach(module('ui.bootstrap'));
  beforeEach(module('mongolab-factory'));
  beforeEach(module('component.customer-orders-page'));
  beforeEach(module('component.customer-orders-list'));

  var directive;

  beforeEach(inject(function (directiveBuilder, $httpBackend) {
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections').respond({
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
      }
    );
    directive = directiveBuilder.build('<customer-orders-page></customer-orders-page>');
    directive.scope.$digest();
    $httpBackend.flush();
  }));

  it('element should get compiled', function () {
    expect(directive.element.html()).toBeDefined();
  });

  it('check "totalSorter" function', function () {
    var order = {
      'unitPrice': '2.19',
      'quantity': 2,
      'product': 'Shelf',
      'id': 'y5it1tuvm'
    };
    var value = directive.scope.totalSorter(order);
    expect(value).toBe(4.38);
  });
});

