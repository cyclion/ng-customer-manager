'use strict';

describe('e2e: navbar', function() {
  /*beforeEach(function() {
    browser().navigateTo('/');
  });*/

  it('should have nav', function() {
    browser().navigateTo('/#');
    //console.log(browser().location().path());
    expect(browser().location().path()).toBe('/');
  });

  it('should have nav', function() {
    browser().navigateTo('/#/orders');
    //console.log(browser().location().path());
    expect(browser().location().path()).toBe('/orders');
  });

  it('should change path after click', function() {
    browser().navigateTo('/#');
    //console.log(element('ul').html());
    expect(element('ul').html()).not().toBe('');
  });
});
