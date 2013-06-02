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

			// title,duration,start,locked,location:title,commute:start;duration,
			var plans = [
				{
					id: 1,
					title: 'Art Tour',
					duration: 300,
					steps: [
						{
							type:'stop',
							title: 'Nashville International Airport',
							location: {
								postal: 'Nashville International Airport',
								longitude:'',
								latitude:''
							},
							start: new Date(),
							duration: 105,
							locked:false,
							points: [
								{
									title:'Dancing on Air',
									description:'2 mobiles with color bent metal pieces.',
									duration: 60
								},
								{
									title: 'Airport Sun Project',
									description:'Colorful panels along the truss system and ticketing lobby wall that change dependent upon sun and shadows.',
									duration: 45
								}
							]
						},
						{
							type:'commute',
							title: 'Commute',
							duration: 15
						},
						{
							type:'stop',
							title:'Scheduled Event',
							description: '501 Commerce St, Nashville TN, 37203',
							start: new Date(),
							duration: 240,
							locked:true,
							location: {
								title: 'Nashville Convention Center'
							}
						}
						/*
						{
							id: 1,
							title: 'Dancing on Air',
							description:'2 mobiles with color bent metal pieces.',
							start: new Date(),
							duration: 60,
							locked:true,
							location: {
								id:1,
								title: 'Nashville International Airport'
							},
							commute:null
						},
						{
							id: 2,
							title: 'Airport Sun Project',
							description:'Colorful panels along the truss system and ticketing lobby wall that change dependent upon sun and shadows.',
							start: new Date(),
							duration: 45,
							locked:true,
							location: {
								id:2,
								title: 'Nashville International Airport'
							},
							commute:null
						},
						{
							id:3,
							title:'Scheduled Event',
							description: '501 Commerce St, Nashville TN, 37203',
							start: new Date(),
							duration: 240,
							location: {
								id:3,
								title: 'Nashville Convention Center'
							}
							commute: {
								duration: 15,
								start: new Date()
							}
						}
						*/
					]
				}
			];

			return {

				getPlan: function (id) {
					var idx = -1;
					plans.some(function (index, item) {
						if (item.id === id) {
							idx = index;
							return true;
						}
						return false;
					});
					return plans[idx];
				},

				listPlans: function () {
					return plans.slice();
				}
			};
		}
	]

});