'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var module = angular.module('myApp.services', []);
	
module.factory('PlayerlistService', function()
{
	var instance = {};
	
	instance.players = [];
	
	return instance;
});

module.factory('VoteService', function()
{
	var instance = {};
	
	instance.playervotes=[];
	instance.yeas = 0;
	
	instance.clear = function()
	{
		instance.playervotes = [];
		instance.yeas = 0;
	}
	
	return instance;
});

