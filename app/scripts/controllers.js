var voteC = angular.module('voter.controllers', []);


voteC.controller('AddPlayerCtrl', function($scope, $http, PlayerlistService)
	{
		$scope.players = PlayerlistService.players;
		$scope.playeralert = '';
		$scope.alertclass = 'alert';
		$scope.error = false;
		$scope.success = false;
		$scope.colors = [];
		$http.get('webcolors.json').success(function(array)
			{
				$scope.colors = array;
			});
		//add a player
		$scope.addPlayer = function()
		{
			addToPlayers($scope.playername, $scope.playercolor);
		};
		
		$scope.loadDefaults = function()
		{
			$http.get('defaults.json').success(function(array)
			{
				PlayerlistService.players = array;
				$scope.players = PlayerlistService.players;
			});
			isError(false);
			$scope.playeralert = 'Defaults added.';
		};
		
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
			var removed = $scope.players.splice(index, 1);
			
			isError(false);
			$scope.playeralert = removed[0].name + ' removed.';
		};
		
		function addToPlayers(playername, playercolor)
		{
			//Check to make sure there is a player name to add
			if (playername == null || playername == '')
			{
				isError(true);
				$scope.playeralert =
				'Please enter a player name before attempting to add it.';
				return;
			}
			
			//Check for player uniqueness
			for (var index = 0; index < $scope.players.length; ++index)
			{
				
				if ($scope.players[index].name === playername)
				{
					isError(true);
					$scope.playeralert =
					playername + ' is already taken. Please choose a different name.';
					return;
				}
			}
			
			$scope.players.push(
			{
				name: playername,
				color: playercolor
			});
			
			isError(false);
			$scope.playeralert = 'Player ' + $scope.playername + ' added.';
			$scope.playername = '';
		}
	});
	
voteC.controller('VoteCtrl', function($scope, $location, PlayerlistService, VoteService)
 {
			$scope.index = 0;
			$scope.players = PlayerlistService.players;
			
			$scope.clearVotes = function()
			{
				VoteService.clear();
			};
			
			$scope.addVote = function(vote)
			{
				if (vote)
				{
					VoteService.yeas++;
				}
				
				VoteService.playervotes[$scope.players[$scope.index].name] = vote  ? '\u2713' : '\u2718';
				
				$scope.index++;
				
				if ($scope.index >= $scope.players.length)
				{
					$location.path('/results');
				}
			};
		});
	
voteC.controller('ResultsCtrl', function($scope, PlayerlistService, VoteService)
	{
		$scope.players = PlayerlistService.players;
		$scope.votes = VoteService.playervotes;
		$scope.yeas = VoteService.yeas;
		$scope.showMap = [];
		
		for (var i = 0; i < $scope.players.length; ++i)
		{
			$scope.showMap[i] = false;
		}
				
		var nays = (PlayerlistService.players.length - $scope.yeas);
		
		if ($scope.yeas > nays)
		{
			$scope.message = 'Vote passes!';
		}
		else
		{
			$scope.message = 'Vote fails!';
		}
		
		$scope.score = $scope.yeas + ' to ' + nays;
		
		$scope.toggleVote = function(index)
		{
			$scope.showMap[index] = !$scope.showMap[index];
		};
				
	});