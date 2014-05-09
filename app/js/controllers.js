'use strict';

/* Controllers */

var module = angular.module('myApp.controllers', []);


module.controller('PlayerAdditionCtrl', function($scope, $http, PlayerlistService) {
		$scope.players = PlayerlistService.players;
		$scope.playeralert = "";
		$scope.alertclass = "alert";
		$scope.error = false;
		$scope.success = false;
		$scope.colors = []
		$http.get('webcolors.json').success(function(array)
			{
				$scope.colors = array;				
			});
		//add a player
		$scope.addPlayer = function()
		{	
			addToPlayers($scope.playername, $scope.playercolor);	
		}
		
		$scope.loadDefaults = function()
		{
			$http.get('defaults.json').success(function(array)
			{
				PlayerlistService.players = array;
				$scope.players = PlayerlistService.players;	
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
				console.log($scope.players[index].name + " ==  " + playername)
				
				if ($scope.players[index].name == playername)
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
	
	module.controller('VoteCtrl', function($scope, $location, PlayerlistService, VoteService) 
	{
			$scope.index = 0;
			$scope.players = PlayerlistService.players;
			
			$scope.addVote = function(vote)
			{					
				if (vote)
				{
					VoteService.yeas++;
				}
							
				VoteService.playervotes[$scope.players[$scope.index].name] = vote;
				
				$scope.index++;				
				
				if ($scope.index >= $scope.players.length)
				{
					$location.path("/results")
				}
			}
	});
