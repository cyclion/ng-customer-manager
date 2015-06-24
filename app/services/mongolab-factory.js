'use strict';

angular.module('mongolab-factory', [
  'ngResource'
]).provider('mongolabFactory', function (mongolabConfigs) {
  this.setConfigs = function (_mongolabConfigs) {
    angular.extend(mongolabConfigs, _mongolabConfigs);
  };

  this.$get = function ($resource) {
    var c = mongolabConfigs;
    var url = [c.mongolabUrl, c.dataBase, 'collections', c.collection, ':id'].join('/');
    return $resource(url, {apiKey: c.apiKey}, {
      get:    {method:'GET'},
      query:  {method:'GET',isArray:true},
      queryData:  {
        method:'GET',
        isArray:true,
        interceptor:{
          response: function (response){
            console.log(response);
            return response.data;
          }
        }
      },
      update: {method:'PUT'},
      save:   {method:'POST'},
      remove: {method:'DELETE'},
      delete: {method:'DELETE'}
    });
  };
}).constant('mongolabConfigs',  {
  mongolabUrl: 'https://api.mongolab.com/api/1/databases',
  collection: null,
  dataBase: null,
  apiKey: null
});
