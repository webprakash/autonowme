/**
 * Created by Prakash Khandelwal on 3/8/2015.
 */

function getRemoteURL(mFile){
	return appConfig.libUrl + mFile;
};

function getAddonPath(addonKey){
	return MODULES + addonKey.split('.').join('/' + MODULES);
};

function getModuleUrl(path){
	console.log(appConfig.appUrl + appConfig.module.name  + '/' + path);
	return appConfig.appUrl + appConfig.module.name  + '/' + path;
}

function getAddonUrl(addonKey){
	return appConfig.appUrl + appConfig.module.name  + '/' + getAddonPath(addonKey);
};

function getDataUrl(path){
	return appConfig.dataUrl + path;
};

function getLetterIcon(mName){
	var letter = mName.substring(0,1).toUpperCase();
	if (letter == '')
	{
		letter = 'nopic';
	}
	return getRemoteURL('img/letters/material/' + letter + '.png');
};

function getUploadedImgURL(mImg, size){
	if (mImg == '' || mImg == undefined){
        mImg = 'http://via.placeholder.com/' + size;
        return mImg;
    }
    else {
        return appConfig.dataUrl + mImg;        
    }
}

function getUploadedFileURL(mFile){
	if (mFile == '' || mFile == undefined){
        mFile = '';
        return mFile;
    }
    else {
        return appConfig.dataUrl + mFile;        
    }
}
 
angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}

angular.module('app').factory('helper1', function ($http, $compile, DTOptionsBuilder, AuthService) {
    var factory = {}; 
    
    factory.getDTOptions = function(url, scope){
        var urlBase = appConfig.wsModuleUrl;

        return DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                url: urlBase + url,
                type: 'GET',
                beforeSend : function(xhr) {
                    xhr.setRequestHeader("Authorization", window.sessionStorage.getItem('snehToken'));
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

function getDtOptions(url, DTOptionsBuilder, $compile, $scope, data){
    var urlBase = appConfig.wsUrl;
    return DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         url: urlBase + url,
		 data: data,
         type: 'POST',
         beforeSend : function(xhr) {
            xhr.setRequestHeader("Authorization", window.sessionStorage.getItem('snehToken'));
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

function getDtOptionsNotResponsive(url, DTOptionsBuilder, $compile, $scope, data){
    var urlBase = appConfig.wsUrl;
    return DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         url: urlBase + url,
		 data: data,
         type: 'POST',
         beforeSend : function(xhr) {
            xhr.setRequestHeader("Authorization", window.sessionStorage.getItem('snehToken'));
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
    .withOption('responsive', false)
    .withBootstrap();    
}

