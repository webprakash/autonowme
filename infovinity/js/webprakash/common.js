/**
 * Created by Prakash Khandelwal on 3/8/2015.
 */

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}

angular.module('app').factory('helper', function ($http, $compile, DTOptionsBuilder) {
    var factory = {}; 
    
    factory.getDTOptions = function(url, scope){
        var urlBase = appConfig.wsModuleUrl;

        return DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                url: urlBase + url,
                type: 'GET',
                beforeSend : function(xhr) {
                    xhr.setRequestHeader("Authorization", window.sessionStorage.getItem('rmsToken'));
                }
            })
            // or here
            .withDataProp('data')
            .withOption('serverSide', true)
            .withOption('order', [[ 0, "desc" ]])
            .withPaginationType('full_numbers')
            .withOption('createdRow', function(row, data, dataIndex) {
                $compile(angular.element(row).contents())(scope);
            })
            .withBootstrap();
    }
    
    return factory;
});

angular.safeApply = function(s) {
    if (s.$root.$$phase != '$apply' && s.$root.$$phase != '$digest') {
        s.$apply();
    }
}

var PreventDefault = function () {

    var linkFn = function (scope, element, attrs) {
        $(element).on("click", function (event){
            event.preventDefault();
        });
    };

    return {
        restrict: 'A',
        link: linkFn
    }
};

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function getDtOptions(url, DTOptionsBuilder, $compile, $scope){
    var urlBase = appConfig.wsModuleUrl;
    return DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         url: urlBase + url,
         type: 'POST',
         beforeSend : function(xhr) {
            xhr.setRequestHeader("Authorization", window.sessionStorage.getItem('rmsToken'));
        }
     })

     // or here
    .withDataProp('data')
    .withOption('serverSide', true)
    .withOption('order', [[ 0, "desc" ]])
    .withPaginationType('full_numbers')
    .withOption('createdRow', function(row, data, dataIndex) {
        $compile(angular.element(row).contents())($scope);
    })
    .withOption('responsive', true)
    .withBootstrap();    
}

function getModulePath(mPath){
    return MODULES + mPath.split('.').join('/' + MODULES) + '/';
}

function getRemoteURL(file){
	return appConfig.engineUrl + file;
}