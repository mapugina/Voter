'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var voteS = angular.module('voter.services', []);
	
voteS.factory('PlayerlistService', function()
{
	var instance = {};
	
	instance.players = [];
	
	return instance;
});

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
