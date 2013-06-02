'use strict';

var app = angular.module('NashCivicHackApp');

app.controller({

	ScheduleCtrl: [

		'$scope', 'Schedules', '$q',
		function ($scope, Schedules, $q) {

			$scope.$watch('filter', function (filter) {

				$scope.plans = $q.when(Schedules.listPlans())
					.then(function (plans) {
						$scope.plan = plans[0];
					});
				
			});

		}
	]

});

app.service({

	Schedules: [

		function () {

			var schedules = [
				{
					id: 1,
					name: 'Art Tour',
					duration: 60,
					stops: [
						{
							id: 1,
							title: 'Frist Museum',
							start: new Date(),
							end: new Date(),
							location: {
								postal: '123 Broadway, Nashville TN 37206',
								latitude: '',
								longitude: '',
								altitude: '',
								accuracy: 25,
								altitudeAccuracy: 25
							}
						}
					]
				}
			];

			return {

				getPlan: function (id) {
					var idx = -1;
					schedules.some(function (index, item) {
						if (item.id === id) {
							idx = index;
							return true;
						}
						return false;
					});
					return schedules[idx];
				},

				listPlans: function () {
					return schedules.slice();
				}
			};
		}
	]

});