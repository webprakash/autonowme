(function() {
	"use strict";

	angular.module("editableModule", ['ng']).directive("editable", function($timeout) {
		return {
			restrict: "AE",
			scope: true,
			require:"ngModel",
			link: function(scope, element, attrs, ngModel) {
				var loadXeditable = function() {
					element.editable({
						placement: 'left',
						emptytext: '<i class="icon-plus"></i>',
						autotext: 'auto',
						ajaxOptions: {
							type: 'POST',
							beforeSend: function (xhr) {
								xhr.setRequestHeader("Authorization", window.sessionStorage.getItem('snehToken'));
							}
						},
						success: function(response, newValue) {
							$timeout(function() {
								ngModel.$setViewValue(newValue);
								ngModel.$render();
							});
						},

                        params: function (params) {
                            params.customParam = $(element).data('custom');
                            return params;
                        }

                        /*
						display: function(value, srcData) {
							ngModel.$setViewValue(value);
							// scope.$apply();
						}
						*/
					});
					scope.$watch(attrs.ngModel, function(newValue) {
						$(element).editable('setValue', newValue);
					});
				}
				$timeout(function() {
					loadXeditable();
				}, 10);
			}
		};
	});
}).call(this);