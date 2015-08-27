'use strict';

describe('navbar', function () {
  console.log('navbar');
  beforeEach(module('templates'));
  beforeEach(module('ui.router'));
  beforeEach(module('component.navbar'));

  it('element should get compiled', inject(function (directiveBuilder) {
    console.log('element should get compiled');
    var directive = directiveBuilder.build('<navbar></navbar>');
    directive.scope.$digest();
    var html = directive.element.html();
    console.log('html', html);
    expect(html).toBeDefined();
  }));

  it('Customers menu item must be active', inject(function (directiveBuilder, $state) {
      $state.current.name = 'customers';
      var directive = directiveBuilder.build('<navbar></navbar>');
      directive.scope.$digest();
      expect(directive.element.find('li').eq(0).hasClass('active')).toBe(true);
      expect(directive.element.find('li').eq(1).hasClass('active')).toBe(false);
    })
  );

  it('Orders menu item must be active', inject(function (directiveBuilder, $state) {
      $state.current.name = 'orders';
      var directive = directiveBuilder.build('<navbar></navbar>');
      directive.scope.$digest();
      expect(directive.element.find('li').eq(0).hasClass('active')).toBe(false);
      expect(directive.element.find('li').eq(1).hasClass('active')).toBe(true);
    })
  );

  it('menu items must not be active', inject(function (directiveBuilder, $state) {
      $state.current.name = 'addOrder';
      var directive = directiveBuilder.build('<navbar></navbar>');
      directive.scope.$digest();
      expect(directive.element.find('li').eq(0).hasClass('active')).toBe(false);
      expect(directive.element.find('li').eq(1).hasClass('active')).toBe(false);
    })
  );

});
