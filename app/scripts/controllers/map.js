'use strict';
angular.module('NashCivicHackApp')
  .controller('MapsCtrl', ['$scope','$timeout','$log','$http','$stateParams','Schedules', function ($scope, $timeout, $log, $http,$stateParams,sch) {
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
		originProperty: {
	        latitude: 36.166667,
	        longitude: -86.783333
	      },
	      destinationProperty: {
	        latitude: 36.166667,
	        longitude: -86.783333
	      },
		
		/** the initial zoom level of the map */
		zoomProperty: 14,
		
		/** list of markers to put in the map */
		markersProperty: [],
		
		// These 2 properties will be set when clicking on the map
		clickedLatitudeProperty: null,	
		clickedLongitudeProperty: null,
		
		eventsProperty: {
		  click: function (mapModel, eventName, originalEventArgs) {	
		    // 'this' is the directive's scope
		    console.log("user defined event on map directive with scope", this);
		    console.log("user defined event: " + eventName, mapModel, originalEventArgs);
		  }
		}
	});

	var getProp = function(obj,prop){
	  prop = (prop + "").toLowerCase();
	  for(var p in obj){
	     if(obj.hasOwnProperty(p) && prop == (p+ "").toLowerCase()){
	     	if (obj[p] == null || obj[p] == '')
	     		return null;
	     	return obj[p];
	      }
	   }
	   return undefined;
	};

	var searchurl = function(col,search) {
		return "/#/maps?col=" + escape(col) + "&search=" + escape(search);
	};

	var checkMore = function(search,col,list) {

		if (list == null)
			return '';

		var count = 0;
		for(var i = 0; i<list.length;i++) {
			var prop = getProp(list[i],col);
			if (prop == null || prop.toLowerCase() != search.toLowerCase()) continue;
			count++;
		}

		if (count<2) {
			return '';
		}

		return '(<a href="' + searchurl(col,search) + '">' + count + '</a>)';
	};

	var addPoint = function(item,list) {
		if (!item.Latitude || !item.Longitude){
    		return;
    	}

    	var content = [];

    	var title = getProp(item,"Title");
    	if (title != null) {
    		content.push('<div style="font-weight:bold;font-size:1.3em;">' + title + "</div>");
    	}

    	var subject = getProp(item,"Subject");
    	if (subject != null) {
    		content.push('<div style="font-size:0.9em;"><i>' + subject + "</i></div>");
    	}

    	var location = getProp(item,"Location");
    	if (location != null) {
    		content.push('<div><strong>Location: </strong>' + location + ' ' + checkMore(location,'Location',list) + '</div>');
    	}

    	var type = getProp(item,"Type");
    	if (type != null) {
    		content.push('<div><strong>Type: </strong>' + type + ' ' + checkMore(type,'Type',list) + '</div>');
    	}

    	var medium = getProp(item,"Medium");
    	if (medium != null) {
    		content.push('<div><strong>Medium: </strong>' + medium + ' ' + checkMore(medium,'Medium',list) + '</div>');
    	}

    	var artist = getProp(item,"Artist(s)");
    	if (artist != null) {
    		content.push('<div><strong>Artist(s): </strong>' + artist + ' ' + checkMore(artist,'Artist(s)',list) + '</div>');
    	}

    	var owner = getProp(item,"Owner");
    	if (owner != null) {
    		content.push('<div><strong>Owner: </strong>' + owner + ' ' + checkMore(owner,'Owner',list) + '</div>');
    	}

    	var remarks = getProp(item,"Remarks");
    	if (remarks != null) {
    		content.push('<div><strong>Remarks: </strong>' + remarks + '</div>');
    	}

    	content.push('<div><a href="https://maps.google.com/maps?saddr=Current+Location&daddr=' + item.Latitude + ',' + item.Longitude + '">Get Directions</a></div>')


    	$scope.markersProperty.push({
			latitude: parseFloat(item.Latitude),
			longitude: parseFloat(item.Longitude),
			infoWindow: content.join('')
		});	
	};

	var addWaypoint = function(item) {
		if ($stateParams.route != null) {
    		if (!$scope.waypointsProperty) {
    			$scope.waypointsProperty = [];
    		}
    		$scope.waypointsProperty.push({
	    		location: item.Location,
				latitude: parseFloat(item.Latitude),
				longitude: parseFloat(item.Longitude)
			});	
    	}
	};

	var addMapData = function(data) {
		if (data.success == null || data.success == false){
	    	alert(data.error);	
	    	return;
	    }

	    for(var i = 0;i < data.list.length;i++) {
	    	var item = data.list[i];
	    	addPoint(item,data.all);
	    	addWaypoint(item);
	    }

	    if ($scope.markersProperty.length == 1)
			$scope.position.coords = $scope.markersProperty[0];
	};

	var url = '/data';
	if ($stateParams.id != null) {
		url = '/data/' + $stateParams.id;
	} else if ($stateParams.col != null && $stateParams.search != null) {
		url = '/data/' + $stateParams.col + '/' + $stateParams.search;
	} else if ($stateParams.plan != null) {
		url = '/data/' + sch.getPlanIds(+$stateParams.plan).join(',');
		sch.getPlan(+$stateParams.plan,35,-86).then(function (response) {
	  		console.log(response);
	  	}); 
	}

	$http({method: 'GET', url: url }).
	  success(function(data, status, headers, config) {
	    addMapData(data);
	  });
}]);
