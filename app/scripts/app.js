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
				name:'app.dashboard',
				url:'',
				views: {
					main: {
						templateUrl: 'views/main.html',
						controller: 'MainCtrl'
					}
				}
			})
			.state({
				name:'app.schedule',
				url:'/schedule',
				views: {
					main: {
						templateUrl: 'views/schedule.html',
						controller: 'ScheduleCtrl'
					},
					detail: {
						templateUrl: 'views/maps.html',
						controller: 'MapsCtrl'
					}
				}
			})
			.state({
				name:'maps',
				url:'/maps',
				templateUrl: 'views/maps.html',
				controller: 'MapsCtrl'
			});
	}
]);
