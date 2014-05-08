'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('PlayerAdditionCtrl', ['$scope', function($scope) {
		$scope.players = [];
		
		//add a player
		$scope.addPlayer = function()
		{
			$scope.players.push(
				{
					name: $scope.playername, 
					color: $scope.playercolor
				});
		}
		
		$scope.styleColor = function (player)
		{
			return { color: player.color }
		}
  }]);
