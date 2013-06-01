'use strict';

var app = angular.module('NashCivicHackApp');

app.directive({

	carousel: [

		function () {

			return {
				restrict: 'EAC',

				link: function ($scope, $element, $attrs) {

					$element.cslider({
						current: 0,
						bgincrement: 50,
						autoplay: false,
						interval: 4000
					});
				}
			};
		}

	]

});