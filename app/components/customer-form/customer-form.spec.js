'use strict';

describe('customer form', function () {
  beforeEach(module('templates'));
  beforeEach(module('component.customer-form'));
  beforeEach(module('mongolab-factory'));
  beforeEach(module('ui.router'));

  it('element should get compiled', inject(function (directiveBuilder) {
    var directive = directiveBuilder.build('<customer-form></customer-form>');
    directive.scope.$digest();
    expect(directive.element.html()).toBeDefined();
  }));

  it('get customer on editCustomer state', inject(function (directiveBuilder, $httpBackend, $state) {
    $state.current.name = 'editCustomer';
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases//collections').respond({});
    var directive = directiveBuilder.build('<customer-form></customer-form>');
    directive.scope.$digest();
    $httpBackend.flush();
  }));

  it('send save request on addCustomer and go to "customers" state', inject(function (directiveBuilder, $httpBackend, $state) {
    spyOn($state, 'go');
    $httpBackend.expectPOST('https://api.mongolab.com/api/1/databases//collections').respond(201, '');
    var directive = directiveBuilder.build('<customer-form></customer-form>');
    directive.scope.$digest();
    directive.scope.addCustomer();
    expect($state.go).not.toHaveBeenCalled();
    directive.scope.customer = {
      'firstName': 'test',
      'lastName': 'test',
      'city': 'test'
    };
    directive.scope.$digest();
    directive.scope.addCustomer();
    $httpBackend.flush();
    expect($state.go).toHaveBeenCalledWith('customers');
  }));

  it('send update request on editCustomer and go to "customers" state', inject(function (directiveBuilder, $httpBackend, $state, $stateParams) {
    spyOn($state, 'go');
    $stateParams.customerId = '558a3519e4b05b2f7ec6401c';
    $httpBackend.expectPUT('https://api.mongolab.com/api/1/databases//collections').respond(201, '');
    var directive = directiveBuilder.build('<customer-form></customer-form>');
    directive.scope.$digest();
    directive.scope.customer = {_id : {oid: '558a3519e4b05b2f7ec6401c'}};
    directive.scope.updateCustomer();
    $httpBackend.flush();
    expect($state.go).toHaveBeenCalledWith('customers');
   }));

  it('should not go into if statement if there are no customerId in $stateParams', inject(function (directiveBuilder, $state, $stateParams) {
    spyOn($state, 'go');
    $stateParams.customerId = undefined;
    var directive = directiveBuilder.build('<customer-form></customer-form>');
    directive.scope.$digest();
    directive.scope.updateCustomer();
    expect($state.go).not.toHaveBeenCalled();
  }));
});
