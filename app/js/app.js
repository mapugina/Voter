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
  $routeProvider.when('/startvote', {templateUrl: 'partials/StartVote.html', controller: 'VoteCtrl'});
	$routeProvider.when('/vote', {templateUrl: 'partials/Voting.html', controller: 'VoteCtrl'});
	$routeProvider.when('/results', {templateUrl: 'partials/Results.html', controller: 'ResultsCtrl'});
  $routeProvider.otherwise({redirectTo: '/playerentry'});
}]);
