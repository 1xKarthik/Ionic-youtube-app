(function () {
  'use strict';
  angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router'
  ]).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/list');
    $stateProvider
      .state('list', {
        url: '/list',
        cache: false,
        templateUrl: 'main/templates/list.html',
        controller: 'listCtrl',
        controllerAs: 'vm'
      })
      .state('item', {
        url: '/item',
        cache: false,
        templateUrl: 'main/templates/item.html',
        controller: 'listCtrl',
        controllerAs: 'vm'
      })
      .state('main.debug', {
        url: '/debug',
        templateUrl: 'main/templates/debug.html',
        controller: 'DebugCtrl as ctrl'
      });
  });

})();
