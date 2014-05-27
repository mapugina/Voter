'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var voteS = angular.module('voter.services', ['ngCookies']);
	
voteS.factory('PlayerlistService', ['$cookieStore', function($cookieStore)
{
	var instance = {};	
	
	var cookie_players = $cookieStore.get('players');	
	if (cookie_players === undefined)
	{
		instance.players = [];
	}
	else
	{
		instance.players = cookie_players;
	}	
		
	instance.removePlayer = function(index)
	{
		var removed = instance.players.splice(index, 1);
		
		//Store altered players array in cookies
		$cookieStore.put('players', instance.players);
		
		var return_me = {
			isError: false,
			message: "Player " + removed[0].name + " removed."
		};
		
		return return_me;
	};
	
	instance.addToPlayers = function(playername, playercolor)
	{			
		//Check to make sure there is a player name to add
		if (playername == null || playername == '')
		{
			var playeralert =
			'Please enter a player name before attempting to add it.';
			var return_me = {
					isError: true,
					message: playeralert
			};
			return return_me;
			
		}
		
		//Check for player uniqueness
		for (var index = 0; index < instance.players.length; ++index)
		{
			
			if (instance.players[index].name === playername)
			{
				var playeralert =
				playername + ' is already taken. Please choose a different name.';
				var return_me = {
						isError: true,
						message: playeralert
				};
				return return_me;
			}
		}
		
		instance.players.push(
		{
			name: playername,
			color: playercolor
		});
		
		//Store altered players array in cookies
		$cookieStore.put('players', instance.players);
		
		var return_me = {
				isError: false,
				message: 'Player ' + $scope.playername + ' added.'
		};
		return return_me;
	}
	
	return instance;
}]);

voteS.factory('VoteService', function()
{
	var instance = {};
	
	instance.playervotes=[];
	instance.participating=[];
	instance.yeas = 0;
	
	instance.clear = function()
	{
		instance.participating=[];
		instance.playervotes = [];
		instance.yeas = 0;
	};
	
	return instance;
});
