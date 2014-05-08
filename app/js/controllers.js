'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('PlayerAdditionCtrl', function($scope, $http) {
		$scope.players = [];
		$scope.playeralert = "";
		$scope.alertclass = "alert";
		//add a player
		$scope.addPlayer = function()
		{	
			addToPlayers($scope.playername, $scope.playercolor);	
		}
		
		$scope.loadDefaults = function()
		{
			$http.get('defaults.json').success(function(array)
			{
				$scope.players = array;	
			});
		}
		
		function addToPlayers(playername, playercolor)
		{
			$scope.players.push(
				{
					name: playername, 
					color: playercolor
				});
				$scope.alertstyle = "alert-success";
				$scope.playeralert = "Player " + $scope.playername + " added.";
		}
  });
