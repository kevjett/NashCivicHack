'use strict';

var app = angular.module('NashCivicHackApp');


app.service({

	Geolocation: [

		'$window', '$q', '$rootScope',
		function ($window, $q, $rootScope) {

			return {

				getCurrentLocation: function () {
					if (!$window.navigator || !$window.navigator.geolocation)  {
						return $q.reject(new Error('NotSupported'));
					}

					var defer = $q.defer();

					$window.navigator.geolocation.getCurrentLocation(function (position) {
						defer.resolve(position);
						$rootScope.$apply();

					}, function (error) {
						defer.reject(error);
						$rootScope.$apply();

					});

					return defer.promise;
				}

			};
		}

	]
});
