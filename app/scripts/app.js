'use strict';


// Declare app level module which depends on filters, and services
angular.module('voter', [
  'ngRoute',
  'voter.services',
  'voter.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/playerentry', {templateUrl: 'views/PlayerEntry.html', controller: 'AddPlayerCtrl'});
  $routeProvider.when('/startvote', {templateUrl: 'views/StartVote.html', controller: 'VoteCtrl'});
	$routeProvider.when('/vote', {templateUrl: 'views/Voting.html', controller: 'VoteCtrl'});
	$routeProvider.when('/results', {templateUrl: 'views/Results.html', controller: 'ResultsCtrl'});
  $routeProvider.otherwise({redirectTo: '/playerentry'});
}]);
