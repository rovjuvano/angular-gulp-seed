angular.module('app', [])
.directive('greeting', [function() {
	return {
		restrict: 'E',
		templateUrl: 'greeting.html',
		scope: {
			name: '@',
		},
		link: function($scope, $element, $attrs) {
		}
	};
}])
