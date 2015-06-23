'use strict';

angular.module('bookmarks', [
  'ui.router',
  'ui.bootstrap'
]).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: '<main/>'
    })
  ;
  $urlRouterProvider.otherwise('/');
}).run(function () {
  console.log('run');
})
;
