'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('PlayerAdditionCtrl', function($scope, $http) {
		$scope.players = [];
		$scope.playeralert = "";
		$scope.alertclass = "alert";
		$scope.error = false;
		$scope.success = false;
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
			isError(false);
			$scope.playeralert = "Defaults added.";
		}
		
		function isError(indicator)
		{
			if (indicator)
			{
				$scope.success = false;
				$scope.error = true;
			}
			else
			{
				$scope.error = false;
				$scope.success = true;
			}
		}
		
		$scope.removePlayer = function(index)
		{
			console.log("in removeplayer");		
			
			var removed = $scope.players.splice(index, 1);
			
			isError(false);
			$scope.playeralert = removed[0].name + " removed.";
		}
		
		function addToPlayers(playername, playercolor)
		{
			//Check to make sure there is a player name to add
			if (playername == null || playername == "")
			{
				isError(true);
				$scope.playeralert = 
				"Please enter a player name before attempting to add it.";
				return;
			}
			
			//Check for player uniqueness
			for (var index = 0; index < $scope.players.length; ++index)
			{
				if ($scope.players[index] == playername)
				{
					isError(true);
					$scope.playeralert = 
					playername + " is already taken. Please choose a different name.";
					return;
				}
			}
			
			$scope.players.push(
			{
				name: playername, 
				color: playercolor
			});
			isError(false);
			$scope.playeralert = "Player " + $scope.playername + " added.";
			$scope.playername = "";
			}
  });
