'use strict';

describe('mongolab factory', function () {

  beforeEach(module('mongolab-factory', function(mongolabFactoryProvider){
    mongolabFactoryProvider.setConfigs({
      mongolabUrl: 'https://api.mongolab.com/api/1/databases',
      collection: 'collection',
      dataBase: 'dataBase',
      apiKey: 'apiKey'
    });
  }));

  it('check provider presets work', inject(function($httpBackend, mongolabFactory) {
    $httpBackend.expectGET('https://api.mongolab.com/api/1/databases/dataBase/collections/collection?apiKey=apiKey').respond({testValue: 100});
    var getResult = mongolabFactory.get();
    $httpBackend.flush();
    expect(getResult.testValue).toBe(100);
  }));
});
