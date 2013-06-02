'use strict';

var app = angular.module('NashCivicHackApp');


app.service({


	Routing: [

		'$q',
		function ($q) {

			return {

				getRoute: function (long, lat, points) {
					var defer = $q.defer();

					function done(response) {
						var steps = [];

						// ...

						defer.resolve(steps);
					}

					return defer.promise;
				}

			};
		}

	]
});
