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

	Schedules: ['Routing','Geolocation',

		function (routing,geo) {

			// title,duration,start,locked,location:title,commute:start;duration,
			var plans = [
				{
					id: 1,
					title: 'Downtown Tour',
					artids: [131,130,129,7,165,167,168,169]
				},
				{
					id: 2,
					title: 'Park Tour',
					artids: [170,305,265,243,407,308,406,239]
				},
				{
					id: 3,
					title: 'Bike Rack Tour',
					artids: [314,315,316,317,318,319,320]
				},
				{
					id: 4,
					title: 'Foutains Tour',
					artids: [250,345,364,377,395]
				},
				{
					id: 5,
					title: 'Cenntenial Tour',
					artids: [1,12,134,136,137,138,274]
				},
				{
					id: 6,
					title: 'Vanderbilt Tour',
					artids: [144,143,142,141,145,147,148,150,151,208,260,262,263,264,329,330,331,332,346,347,348,349,350,351,352,353,354,355,356,357,358]
				},
				{
					id: 7,
					title: 'Land Art Tour',
					artids: [367,376,378,420]
				},
			];

			return {
				getPlanIds: function(id) {
					var idx = -1;
					plans.some(function (item, index) {
						if (item.id === id) {
							idx = index;
							return true;
						}
						return false;
					});

					if (idx == -1)
						return null;

					return plans[idx].artids;
				},

				getPlan: function (id) {
					var idx = -1;
					plans.some(function (item, index) {
						if (item.id === id) {
							idx = index;
							return true;
						}
						return false;
					});

					if (idx == -1)
						return null;

					return geo.getCurrentLocation().then(function (pos) {
						return routing.getRoute(pos.coords.latitude,pos.coords.longitude,plans[idx].artids).then(function(response) { 
					  		return angular.extend({}, plans[idx], response);
					  	});
					});

					
				},

				listPlans: function () {
					return plans.slice();
				}
			};
		}
	]

});