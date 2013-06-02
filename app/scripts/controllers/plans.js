'use strict';

var app = angular.module('NashCivicHackApp');

app.controller({

	PlansCtrl: [

		'$scope', 'Schedules', '$q',
		function ($scope, Schedules, $q) {

			$scope.$watch('filter', function (filter) {

				$scope.plans = Schedules.listPlans();
				
			});

		}
	]

});