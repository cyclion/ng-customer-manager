'use strict';

ddescribe('e2e order add:', function () {
  it('navigate', function() {
    browser().navigateTo('/#/orders/add');
  });

  it('check form', function() {
    var form = element('form[name=orderForm]', 'orderForm');
    expect(form.count()).toBe(1);
    expect(form.count()).toEqual(1);
    expect(form.count()).toBeGreaterThan(0);
  });

  it('check fields', function() {
    console.log(browser().location().path());
    if(browser().location().path().value === 'orders/add'){
      console.log("browser().location().path().value === '/orders/add'");
    }
    expect(element('select').count()).toBe(1);
    expect(element('input[name=product]').count()).toBe(1);
    expect(element('input[name=quantity]').count()).toBe(1);
    expect(element('input[name=unitPrice]').count()).toBe(1);
    var b = element('button.btn-success:not(.ng-hide)');
    expect(b.count()).toBe(1);
    expect(b.attr('disabled')).toBe('disabled');
  });

  it('enter data', function() {
    expect(element('select').attr('class')).toContain('ng-invalid');
    select('customerId').option('0');
    console.log(element('select'));
    expect(element('input[name=product]').attr('class')).toContain('ng-invalid');
    input('order.product').enter('test product');
    expect(element('input[name=product]').attr('class')).not().toContain('ng-invalid');
    expect(element('input[name=product]').val()).toEqual('test product');
    element('input[name=product]').val('test2 product');
    expect(element('input[name=product]').val()).toEqual('test2 product');
  });
});

