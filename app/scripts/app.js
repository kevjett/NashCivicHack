'use strict';

var app = angular.module('NashCivicHackApp', ['google-maps', 'ui.state']);


app.config([
	'$routeProvider', '$stateProvider',
	function ($routeProvider, $stateProvider) {

		$stateProvider
			.state({
				name:'app',
				abstract:true,
				url:'',
				templateUrl: 'views/panels.html'
			})
			.state({
				name:'app.view',
				url:'',
				views: {
					main: {
						templateUrl: 'views/no-schedule.html'
					},
					abstract: {
						templateUrl: 'views/plans.html',
						controller: 'PlansCtrl'
					}
				}
			})
			.state({
				name:'app.schedule',
				url:'/schedule/:plan?route',
				views: {
					main: {
						templateUrl: 'views/schedule.html',
						controller: 'ScheduleCtrl'
					},
					detail: {
						templateUrl: 'views/maps.html',
						controller: 'MapsCtrl'
					},
					abstract: {
						templateUrl: 'views/plans.html',
						controller: 'PlansCtrl'
					}
				}
			})
			.state({
				name:'maps',
				url:'/maps?col&search&id&route&plan',
				templateUrl: 'views/maps.html',
				controller: 'MapsCtrl'
			});
	}
]);
