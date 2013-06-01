'use strict';
angular.module('NashCivicHackApp')
  .controller('MapsCtrl', ['$scope','$timeout','$log','$http','$routeParams', function ($scope, $timeout, $log, $http,$routeParams) {

  	$http({method: 'GET', url: '/data/' + $routeParams.id}).
	  success(function(data, status, headers, config) {
	    console.log('success');
	    console.log(data);
	    $scope.markersProperty.push({
				latitude: 36.08693,
				longitude: -86.874055
			},{
				latitude: 36.149862,
				longitude: -86.813458
			});
	  }).
	  error(function(data, status, headers, config) {
	    console.log('fail');
	  });

	// Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
	google.maps.visualRefresh = true;

	angular.extend($scope, {
	  
	    position: {
	      coords: {
	        latitude: 36.166667,
	        longitude: -86.783333
	      }
	    },
		
		/** the initial center of the map */
		//centerProperty: {
		//	latitude: 36.149862,
		//	longitude: -86.813458
		//},
		
		/** the initial zoom level of the map */
		zoomProperty: 14,
		
		/** list of markers to put in the map */
		markersProperty: [],
		 /*{
				latitude: 36.149862,
				longitude: -86.813458
			},
			{
				latitude: 36.136887,
				longitude: -86.806213
			}],*/
		
		// These 2 properties will be set when clicking on the map
		clickedLatitudeProperty: null,	
		clickedLongitudeProperty: null,
		
		eventsProperty: {
		  click: function (mapModel, eventName, originalEventArgs) {	
		    // 'this' is the directive's scope
		    $log.log("user defined event on map directive with scope", this);
		    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
		  }
		}
	});


  }]);
