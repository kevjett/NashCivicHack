'use strict';

var app = angular.module('NashCivicHackApp');


app.service({


	Routing: [

		'$q', '$rootScope', '$http',
		function ($q, $rootScope, $http) {

			var plan = {};
			var stops = [];

			var buildPlan = function(data) {
				plan = { duration: 0, stops: [] };
				var route = data.routes[0];
				for (var i = 0; i < route.legs.length; i++) {
					var leg = route.legs[i]
					var communte = getCommute(leg);
					plan.stops.push(communte);
					plan.duration = plan.duration + communte.duration;

					if (i != (route.legs.length - 1)) {
						var stopindex = route.waypoint_order[i];
						var stop = stops[stopindex];
						plan.stops.push(stop);
						plan.duration = plan.duration + stop.duration;
					}
				};
				if (route.legs.length > 0) {
					plan.stops.push(getStopObject('Back to Current Location',0));
				}
			};

			var getCommute = function(leg) {
				return {
							type:'commute',
							title: 'Commute',
							duration: parseInt(leg.duration.value/60),
							distance: leg.distance.text
						};
			};

			var parseStops = function(data) {
				stops = [];
				for (var i = data.list.length - 1; i >= 0; i--) {
					addItem(data.list[i]);
				};
			};

			var getStop = function(location) {
				for (var i = 0; i < stops.length; i++) {
		          var loc = stops[i].title;
		          
		          if (loc === location) {
		            return stops[i];
		          }
		        }
		        
		        return null;
			};

			var addItem = function(item) {
				if (!item.Latitude || !item.Longitude)
					return;

				var stop = getStop(item.Location);
				if (stop != null) {
					var point = parsePoint(item);
					stop.points.push(point);
					stop.duration = stop.duration + point.duration;
					return;
				}

				stop = parseStop(item);
				stops.push(stop);
			};

			var parsePoint = function(item) {
				return angular.extend({}, item, { duration: 20 });
			};

			var getStopObject = function(location, duration) {
				return {
					type: 'stop',
					title: location,
					duration: duration,
					location: null,
					start: new Date(),
					locked: false,
					points: []
				};
			}

			var parseStop = function(item) {
				var s = getStopObject(item.Location,20);
				s.location = {
					latitude: item.Latitude,
					longitude: item.Longitude
				};

				var p = parsePoint(item);
				s.points.push(p);
				s.duration = s.duration + p.duration;

				return s;
			};

			var getWaypoints = function() {
				var waypoints = [];
				for (var i = stops.length - 1; i >= 0; i--) {
					var item = stops[i];
					waypoints.push({
						location: new google.maps.LatLng(item.location.latitude, item.location.longitude),
                		stopover: true
					});
				};

				return waypoints;
			};

			return {

				getRoute: function (lat,lng,ids) {
					var defer = $q.defer(),
						that = this;

						var latlng = new google.maps.LatLng(lat,lng);

					function compilePlan() {
						var directionsService = new google.maps.DirectionsService();
						var request = {
				            origin: latlng,
				            destination: latlng,
				            waypoints: getWaypoints(),
				            optimizeWaypoints: true,
				            travelMode: google.maps.TravelMode.DRIVING
				        };
				        directionsService.route(request, function(response, status) {
				        	console.log(response);
				          if (status == google.maps.DirectionsStatus.OK) {
				          	buildPlan(response);
				            done(plan);
				          }
				        });
					}

					function done(plan) {
						defer.resolve(plan);
						$rootScope.$apply();
					}

					$http({method: 'GET', url: 'data/' + ids.join(',') }).
					  success(function(data, status, headers, config) {
					    parseStops(data);
					    console.log(stops);
					    compilePlan();
				  	});

					return defer.promise;
				}

			};
		}

	]
});
