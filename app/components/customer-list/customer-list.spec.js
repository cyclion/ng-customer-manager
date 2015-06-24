'use strict';

describe('customer list', function () {
  beforeEach(module('templates'));
  beforeEach(module('ui.router'));
  beforeEach(module('mongolab-factory'));
  beforeEach(module('component.customer-list'));

  var directive;

  var fakeModal = {
    result: {
      then: function(confirmCallback) {
        this.confirmCallBack = confirmCallback;
      }
    },
    close: function() {
      this.result.confirmCallBack();
    }
  };

  beforeEach(inject(function (directiveBuilder, $httpBackend) {
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections').respond([{
        '_id': {
          '$oid': '5576c0ece4b0e862e44535f5'
        },
        'firstName': 'FirstName',
        'lastName': 'LastName',
        'city': 'TestCity'
      },{
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
      }]);
    directive = directiveBuilder.build('<customer-list></customer-list>');
    directive.scope.$digest();
    $httpBackend.flush();
  }));

  it('element should get compiled', inject(function () {
    expect(directive.element.html()).toBeDefined();
  }));

  it('should receive 2 customers from server', inject(function () {
    expect(directive.scope.customers.length).toBe(2);
  }));

  it('orderCountSorter check', function () {
    var orderCount = directive.scope.orderCountSorter(directive.scope.customers[0]);
    expect(orderCount).toBe(0);
    orderCount = directive.scope.orderCountSorter(directive.scope.customers[1]);
    expect(orderCount).toBe(2);
  });

  it('should open delete confirm form on delete button click', inject(function ($modal) {
    spyOn($modal, 'open').and.returnValue(fakeModal);
    directive.scope.deleteCustomer(directive.scope.customers[0]);
    expect($modal.open).toHaveBeenCalled();
  }));

  it('should send "delete" request to mongo and splice element form customers array', inject(function ($modal, $httpBackend) {
    $httpBackend.expectDELETE('https://api.mongolab.com/api/1/databases//collections//5576c0ece4b0e862e44535f5').respond();
    spyOn($modal, 'open').and.returnValue(fakeModal);
    directive.scope.deleteCustomer(directive.scope.customers[0]);
    directive.scope.deleteConfirmDialog.close();
    $httpBackend.flush();
    expect(directive.scope.customers.length).toBe(1);
  }));
});
