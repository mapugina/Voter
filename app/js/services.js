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

