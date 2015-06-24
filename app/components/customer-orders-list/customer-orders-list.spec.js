'use strict';

describe('customer order list', function () {
  beforeEach(module('templates'));
  beforeEach(module('ui.bootstrap'));
  beforeEach(module('mongolab-factory'));
  beforeEach(module('component.customer-orders-list'));

  var isolateScope, scope, directive;

  var fakeModal = {
    result: {
      then: function (confirmCallback) {
        this.confirmCallBack = confirmCallback;
      }
    },
    close: function () {
      this.result.confirmCallBack();
    }
  };

  beforeEach(inject(function (directiveBuilder) {
    scope = {
      customer: {
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
      },
      sortExpression: 'product',
      sortReverse: false,
      backState: 'customers'
    };
    directive = directiveBuilder.build('<customer-orders-list customer="customer" sortExpression="sortExpression" sortReverse="sortReverse" backState="backState"></customer-orders-list>', scope);
    directive.scope.$digest();
    isolateScope = directive.element.isolateScope();
    isolateScope.$digest();
  }));

  it('element should get compiled', function () {
    expect(directive.element.html()).toBeDefined();
  });

  it('2 buttons should be displayed', function () {
    var list = directive.element.find('button');
    expect(list.length).toBe(2);
  });

  it('total should be equal $1,175.00', function () {
    expect(directive.element.find('tfoot').find('th').eq(1).html()).toEqual('$1,175.00');
  });

  it('sorting should be correct', function () {
    isolateScope.sortExpression = 'product';
    isolateScope.$digest();
    expect(directive.element.find('tbody').find('tr').eq(1).find('td').eq(1).html()).toEqual('Test product 2');
  });

  it('should open delete confirm form on delete button click', inject(function ($modal) {
    spyOn($modal, 'open').and.returnValue(fakeModal);
    directive.element.find('button').eq(0).triggerHandler('click');
    expect($modal.open).toHaveBeenCalled();
  }));

  it('should send "update" request to mongo and splice element form orders array', inject(function ($modal, $httpBackend) {
    $httpBackend.expectPUT('https://api.mongolab.com/api/1/databases//collections//5577cb2ce4b0af2ef8b7b8b2').respond(201, {});
    spyOn($modal, 'open').and.returnValue(fakeModal);
    directive.element.find('button').eq(0).triggerHandler('click');
    isolateScope.deleteConfirmDialog.close();
    $httpBackend.flush();
    expect(isolateScope.customer.orders.length).toBe(1);
  }));

  it('should calc total correct after delete order', inject(function ($modal, $httpBackend) {
    $httpBackend.expectPUT('https://api.mongolab.com/api/1/databases//collections//5577cb2ce4b0af2ef8b7b8b2').respond(201, {});
    spyOn($modal, 'open').and.returnValue(fakeModal);
    directive.element.find('button').eq(1).triggerHandler('click');
    isolateScope.deleteConfirmDialog.close();
    $httpBackend.flush();
    expect(directive.element.find('tfoot').find('th').eq(1).html()).toEqual('$125.00');
  }));
});
