'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/playerentry', {templateUrl: 'partials/PlayerEntry.html', controller: 'PlayerAdditionCtrl'});
  $routeProvider.when('/gameplay', {templateUrl: 'partials/gameplay.html', controller: 'PlayerAdditionCtrl'});
  $routeProvider.otherwise({redirectTo: '/playerentry'});
}]);
