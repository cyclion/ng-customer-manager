'use strict';

angular.module('guid-module', [])
  .service('guidGenerator', function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    this.newGuid = function () {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    this.emptyGuid = function () {
      return '00000000-0000-0000-0000-000000000000';
    };
  })
;
