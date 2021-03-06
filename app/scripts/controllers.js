var voteC = angular.module('voter.controllers', []);


voteC.controller('AddPlayerCtrl', function($scope, $http, PlayerlistService, $q)
	{
		//Setup players array
		
		$scope.players = PlayerlistService.players;
		var reloadArray = function () {
			$scope.players = PlayerlistService.players;
		}
		$scope.$watchCollection('PlayerlistService.players',
		function(){
				$scope.players = PlayerlistService.players;
		})
		
		
		
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
			var errorMsg = PlayerlistService.addToPlayers($scope.playername, $scope.playercolor.hexValue);			
			$scope.playername = '';
			isError(errorMsg.isError);
			$scope.playeralert = errorMsg.message;
			
		};
		
		$scope.loadDefaults = function()
		{
			var deferred = $q.defer();
			deferred.promise.then(reloadArray);
			
			PlayerlistService.loadDefaults(deferred);
			
			$scope.players = PlayerlistService.players;
			
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
			var errorMsg = PlayerlistService.removePlayer(index);
			isError(errorMsg.isError);
			$scope.playeralert = errorMsg.message;
			
			/*
			var removed = $scope.players.splice(index, 1);
			
			isError(false);
			$scope.playeralert = removed[0].name + ' removed.';
			*/
		};
	});
	
voteC.controller('VoteCtrl', function($scope, $location, PlayerlistService, VoteService)
 {
	 VoteService.playervotes = [];
	 VoteService.yeas = 0;
			$scope.index = 0;
			$scope.allplayers = PlayerlistService.players;
			$scope.players = VoteService.participating.length === 0 ?
			 PlayerlistService.players : VoteService.participating;
			
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
			
			function AddParticipant(index)
			{
				var player = PlayerlistService.players[index];
				VoteService.participating.push(player);
			}
			
			function RemoveParticipant(index)
			{
				var player = PlayerlistService.players[index];
				
				for (var i = 0; i < VoteService.participating.length; ++i)
				{
					if (VoteService.participating[i].name === player.name)
					{
						VoteService.participating.splice(i, 1);
					}
				}
			}
			
			$scope.ToggleParticipation = function(index)
			{
				if($scope.playerIsParticipating(index))
				{
					RemoveParticipant(index);
				}
				else
				{
					AddParticipant(index);
				}
			}
			
			$scope.playerIsParticipating = function(index)
			{
				if (VoteService.participating.length === 0)
				{
					$scope.players = PlayerlistService.players;
					return false;
				}
				$scope.players = VoteService.participating;
				
				var player = PlayerlistService.players[index];
				
				for (var i = 0; i < VoteService.participating.length; ++i)
				{
					if (VoteService.participating[i].name === 
						player.name)
					{
						return true;
					}
				}
				
				return false;				
			};
		});
	
voteC.controller('ResultsCtrl', function($scope, PlayerlistService, VoteService)
	{
		$scope.players = VoteService.participating.length === 0 ?
			 PlayerlistService.players : VoteService.participating;
		$scope.votes = VoteService.playervotes;
		$scope.yeas = VoteService.yeas;
		$scope.showMap = [];
		
		for (var i = 0; i < $scope.players.length; ++i)
		{
			$scope.showMap[i] = false;
		}
				
		var nays = ($scope.players.length - $scope.yeas);
		
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
		
		$scope.clearVotes = function()
		{
			VoteService.clear();
		};
				
	});