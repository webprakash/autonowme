angular.module('app').directive('cdTrueValue', [function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			ngModel.$parsers.push(function(v){
				return v ? scope.$eval(attrs.cdTrueValue) : scope.$eval(attrs.cdFalseValue);
			});
		}
	};
}])
