angular.module('webprakash', ['angular-jwt', 'pascalprecht.translate'], function ($translateProvider) {
	// tell angular-translate to use your custom handler
	$translateProvider.useMissingTranslationHandler('defaultTranslateFactory');
});

$.fn.dataTable.ext.errMode = 'none';

angular.module('webprakash').constant('APP_EVENTS', {
    sessionTimeout: 'app-session-timeout',
    notAuthenticated: 'app-not-authenticated',
    notAuthorized: 'app-not-authorized',

    appError: 'app-error',
    appSuccess: 'app-success',
    appInfo: 'app-info',
    appWait: 'app-wait',
    appWarning: 'app-warning'
});

angular.module('webprakash').constant('USER_ROLES', {
    all: '*',
    superadmin: 'superadmin',
    adminstaff: 'adminstaff',
    account: 'account',
    accountstaff: 'accountstaff',
    customer: 'customer'
});

angular.module('webprakash').config(function ($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function() {
        return window.sessionStorage.getItem('snehToken');
    }
    $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.interceptors.push(['$injector',
        function ($injector) {
            return $injector.get('AuthInterceptor');
        }
    ]);
});

angular.module('webprakash').config(function(){
        $.ajaxSetup({
            headers: { 'Authorization': window.sessionStorage.getItem('snehToken') }
        });
    })

angular.module('webprakash').service('tokenService', function ($http, jwtHelper) {
    this.saveToken = function(data, tokenName){
        if (! angular.isUndefinedOrNull(data)){
            var rmsToken = data;
            window.sessionStorage.setItem(tokenName, data);
            $.ajaxSetup({
                headers: { 'Authorization': rmsToken }
            });
            return;
        }
        window.sessionStorage.removeItem(tokenName);
    }

    this.getToken = function(tokenName){

        if (window.sessionStorage.getItem(tokenName) != null && window.sessionStorage.getItem(tokenName) != undefined){
            var rmsToken = window.sessionStorage.getItem(tokenName);
            if (! angular.isUndefinedOrNull(rmsToken)){
                return rmsToken;
            }
        }
        return false;
    }

    this.destroyToken = function(tokenName){
        window.sessionStorage.removeItem(tokenName);
    }

	this.getPayload = function(tokenName){
        if(this.getToken(tokenName)) {
            var tokenPayload = jwtHelper.decodeToken(this.getToken(tokenName));
            return tokenPayload;
        }

        return false;
    }
});

app.factory('defaultTranslateFactory', function () {
	// has to return a function which gets a tranlation ID
	return function (translationID) {
		var str = translationID.split('.');
		return str[str.length - 1].replace(/_/g, " ");
		// return translationID;
		// do something with dep1 and dep2
	};
});


angular.module('webprakash').factory('AuthService', function ($http, $location, $state, tokenService, jwtHelper) {   
    
    var authService = {};

	authService.saveAttemptedUrl = function(def){        
		var attemptedUrl = $location.url();
		return tokenService.saveToken(attemptedUrl, "attemptedUrl");		
	}

	authService.getAttemptedUrl = function(def){
		var attemptedUrl = tokenService.getToken("attemptedUrl");
		if (! attemptedUrl){
			attemptedUrl = def;
		}
		return attemptedUrl;
	}	
	
	authService.refreshToken = function(){		
		return $http.post(appConfig.wsUrl + 'default/refreshtoken', {})
            .then(function (res) {				
				authService.saveToken(res.data.token);
                return res.data.token;                
            });
	}

	authService.saveToken = function (data){
		return tokenService.saveToken(data, "snehToken");
	}

	authService.getToken = function (){
		return tokenService.getToken("snehToken");
	}

	authService.destroyToken = function (){
		tokenService.destroyToken("snehToken");
	}

    authService.login = function (credentials) {        
        return $http.post(appConfig.wsUrl + 'default/jwtlogin', credentials)
            .then(function (res) {				
                authService.saveToken(res.data.token);
                return res.data.token;
            });
    };

    authService.isAuthenticated = function () {
        var rmsToken = tokenService.getToken("snehToken");

        if (rmsToken) {
            if (!jwtHelper.isTokenExpired(rmsToken)) {
                return true;
            }
        }
        return false;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }

        if(authService.getToken()) {
            var tokenPayload = jwtHelper.decodeToken(authService.getToken());
            return (authService.isAuthenticated() && authorizedRoles.indexOf(tokenPayload.userRole) !== -1);
        }

        return false;
    };

    authService.getPayload = function(){
        if(authService.getToken()) {			
            var tokenPayload = jwtHelper.decodeToken(authService.getToken());
            return tokenPayload;
        }

        return false;
    }

    authService.logout = function(){
        authService.destroyToken();
    }

    return authService;
});

angular.module('webprakash').factory('AuthInterceptor', function ($rootScope, $q, APP_EVENTS) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: APP_EVENTS.notAuthenticated,
                403: APP_EVENTS.notAuthorized,
                419: APP_EVENTS.sessionTimeout,
                440: APP_EVENTS.sessionTimeout,
                411: APP_EVENTS.appError,
            }[response.status], response);
            return $q.reject(response);
        },
        response: function (response) {
            if (! angular.isUndefinedOrNull(response.data.rmsToken)){
                window.sessionStorage.setItem("snehToken", response.data.rmsToken);
            }
            $rootScope.$broadcast({
                211: APP_EVENTS.appSuccess,
                212: APP_EVENTS.appInfo,
                213: APP_EVENTS.appWait,
                214: APP_EVENTS.appWarning
            }[response.status], response);            
            return response;
        }
    };
});

angular.module('webprakash').factory('dataFactory', ['$http', function($http) {
    var urlBase = appConfig.wsUrl;
	
    var dataFactory = {};

    dataFactory.getData = function (url, params) {
		// console.log(params);
		var qStr = "";
		for (var key in params) {
			// console.log(key);
			if (!params.hasOwnProperty(key)) continue;
			var obj = params[key];
			if (qStr != ""){
				qStr = qStr + "/";
			}
			qStr = qStr + key + "/" + obj;			
		}
        return $http.get(urlBase + url + qStr, params);
    };

    dataFactory.postData = function (url, params) {
        return $http.post(urlBase + url, params);
    };

    return dataFactory;
}]);

angular.module('webprakash').factory('helper', ['$rootScope', '$http', 'dataFactory', '$ocLazyLoad', '$q', 'JQ_CONFIG', 'MODULE_CONFIG', function($rootScope, $http, dataFactory, $ocLazyLoad, $q, JQ_CONFIG, MODULE_CONFIG) {

    var helper = {};

    helper.getRemoteURL = function (mFile) {
        return getRemoteURL(mFile);
    };
	
	helper.getModuleUrl = function(path){
		return getModuleUrl(path);
	}
	
	helper.getDataUrl = function(path){
		return getDataUrl(path);
	}

    helper.getAddonPath = function (mPath) {
        return getAddonPath(mPath);
    };
	
	helper.getCurrentAddonPath = function(){
		return appConfig.module.name  + '/' + helper.getAddonPath($rootScope.$state.$current.parent.name);
	}
	
	helper.getAddonUrl = function(addonKey){
		return getAddonUrl(addonKey);
	}
		
	helper.getCurrentAddonTplUrl = function(tpl){
		return getAddonUrl($rootScope.$state.$current.parent.name) + tpl;
	}
		
	helper.getProfilePic = function(userData){
		if (typeof userData !== "undefined") {
			//if (userData != undefined){	
		
			if (userData.profile_image != '' && userData.profile_image != null){
				return helper.getDataUrl(userData.profile_image);
			}
			return getLetterIcon(userData.first_name);
		}		
	}

	helper.getFilePreview = function(fileName){
		if (typeof fileName !== "undefined") {
			//if (userData != undefined){	

			var ext = fileName.split('.').pop();
			ext = ext.toUpperCase();
			
			
			if (ext == 'JPG' || ext == 'JPEG' || ext == 'GIF' || ext == 'PNG'){
				return helper.getDataUrl(fileName);
			}
			

			return getLetterIcon(ext);
		}		
	}
	
	helper.getLetterIcon = function (mName) {
        return getLetterIcon(mName);
    };
	
	helper.getUploadedImgURL = function(mImg, size){		
		return getUploadedImgURL(mImg, size);
	}
	
	helper.getUploadedFileURL = function(mFile){		
		return getUploadedFileURL(mFile);
	}
	
	helper.save = function(actionUrl, obj, goTo, isAbsolute){
		if(angular.isUndefinedOrNull(goTo)){
			goTo = '.list';
		}

		if(angular.isUndefinedOrNull(isAbsolute)){
			isAbsolute = false;
		}

		dataFactory.postData(actionUrl, obj).then(
            function (res) {
				if (isAbsolute){
					$rootScope.$state.go(goTo);
				}
				else {
					helper.goPeer(goTo);
				}                
            },
            function (error) {
				console.log(error);
            }
        );
	}
	
	helper.TrueFalse = function(v){
		if (v == 1) return true;
        return false;
	}
	
	helper.BoolToInt = function(v){
		if (v) return 1;
        return 0;
	}

	helper.go = function(s){		
		$rootScope.$state.go(s);
	}
	
	helper.goPeer = function(s){		
		$rootScope.$state.go($rootScope.$state.$current.parent.name + s);
	}
	
	helper.getDTActionHTML = function(deleteUrl, tblInstance, data){
	
		return '' +
        
        '<a class="btn btn-xs btn-default" ui-sref="' + $rootScope.$state.$current.parent.name + '.edit({id:' + data.id + '})">' + 
               '<i class="fa fa-edit"></i>' +
        '</a>' +
        
        '<button type="button" ng-click="' + 'helper.deleteDTObj(\'' + deleteUrl + '\',' + tblInstance + ',' + data.id + ')" class="btn btn-xs btn-default m-l-xs">' + 
               '<i class="fa fa-times"></i>' +
        '</button>';
	}
	
	helper.deleteDTObj = function(deleteUrl, tblInstance, id){
        var r = confirm("Are you sure, you want to delete this user ?");
        if (r == true) {
            var params = {'id' : id}
            dataFactory.postData(deleteUrl, params).then(
                function (res) {
                    tblInstance.reloadData(function(){}, true);
                },
                function (error) {
                    // $scope.status = 'Unable to load customer data: ' + error.message;
                }
            );
        }
    }

	helper.load = function load(srcs, callback) {

		  var deferred = $q.defer();
		  var promise  = false;
		  srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
		  if(!promise){
			promise = deferred.promise;
		  }
		  console.log(srcs);
		  angular.forEach(srcs, function(src) {
			console.log(src);
			promise = promise.then( function(){
			  // console.log(JQ_CONFIG[src]);
			  if(JQ_CONFIG[src]){
				return $ocLazyLoad.load(JQ_CONFIG[src]);
			  }
			  angular.forEach(MODULE_CONFIG, function(module) {
				if( module.name == src){
				  name = module.name;
				}else{
				  name = src;
				}
			  });
			  console.log(name);
			  return $ocLazyLoad.load(name);
			} );
		  });
		  deferred.resolve();
		  return callback ? promise.then(function(){ return callback(); }) : promise;

		
	}
	
	helper.convertDateStringsToDates = function convertDateStringsToDates(input, frmt) {
				
		// Ignore things that aren't objects.
		if (typeof input !== "object") return input;

		for (var key in input) {
			
			
			if (!input.hasOwnProperty(key)) continue;

			var value = input[key];
			
			
			var match;
			// Check for string properties which look like dates.
			// if (typeof value === "string" && (match = value.match(regexIso8601))) {
				
			var frmt1 = 'dd-MMM-yyyy';
			var frmt2 = 'dd-MMM-yyyy HH:mm:ss';	
	
							
			if (typeof value === "string" && (isDate(value, frmt1) || isDate(value, frmt2))) {				
								
				if (isDate(value, frmt1)){
					input[key] = new Date(getDateFromFormat(value, frmt1));
				}
				else if (isDate(value, frmt2)){
					input[key] = new Date(getDateFromFormat(value, frmt2));
				}
				
				// var milliseconds = Date.parse(match[0])
				// if (!isNaN(milliseconds)) {
				//	input[key] = new Date(milliseconds);
				// }
				
			} else if (typeof value === "object") {
				// Recurse into object
				this.convertDateStringsToDates(value);
			}
		}
		
		return input;
		
	}

    return helper;
}]);


angular.module('webprakash').run(['$rootScope', '$transitions', '$state', '$stateParams', '$translate', '$localStorage', '$window', '$timeout', 'AuthService', '$cookieStore', 'toaster', 'helper', 
        function ($rootScope, $transitions, $state, $stateParams, $translate, $localStorage, $window, $timeout, AuthService, $cookieStore, toaster, helper) {
			
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			$rootScope.helper = helper;			
			
                       
            $rootScope.$on('app-error', function(event, mass) {				
                if (! angular.isObject(mass.data)){
                    toaster.pop("error", 'Error', mass.data);
                }
                else if(mass.data.hasOwnProperty('msg')){
                    toaster.pop("error", 'Error', mass.data.msg);
                }
            });

            $rootScope.$on('app-success', function(event, mass) {				
                if (! angular.isObject(mass.data)){
                    toaster.pop("success", '', mass.data);
                }
                else if(mass.data.hasOwnProperty('msg')){
                    toaster.pop("success", '', mass.data.msg);
                }
            });

            $rootScope.$on('app-info', function(event, mass) {
                if (! angular.isObject(mass.data)){
                    toaster.pop("info", '', mass.data);
                }
                else if(mass.data.hasOwnProperty('msg')){
                    toaster.pop("info", '', mass.data.msg);
                }
            });

            $rootScope.$on('app-wait', function(event, mass) {
                if (! angular.isObject(mass.data)){
                    toaster.pop("wait", '', mass.data);
                }
                else if(mass.data.hasOwnProperty('msg')){
                    toaster.pop("wait", '', mass.data.msg);
                }
            });

            $rootScope.$on('app-warning', function(event, mass) {
                if (! angular.isObject(mass.data)){
                    toaster.pop("warning", '', mass.data);
                }
                else if(mass.data.hasOwnProperty('msg')){
                    toaster.pop("warning", '', mass.data.msg);
                }
            });

            $rootScope.$on('app-session-timeout', function(event, mass) {
                if(! $state.includes('access.signin')){
					AuthService.saveAttemptedUrl();
					$timeout(function(){
						$state.go('access.signin');
					});
                }
            });

            $rootScope.$on('app-not-authenticated', function(event, mass) {
				
                if(! $state.includes('access.signin')){					
					AuthService.saveAttemptedUrl();
                    event.preventDefault();
					$timeout(function(){
						$state.go('access.signin');
					});
                }
            });

            $rootScope.$on('app-not-authorized', function(event, mass) {
                if(! $state.includes('access.signin')){
					AuthService.saveAttemptedUrl();
					$timeout(function(){
						$state.go('access.signin');
					});
                    toaster.pop("error", 'Error', mass.data);
                }
            });
            
            $transitions.onBefore( { to: 'superadmin.**' }, function(trans) {        
                
                // console.log(trans.from().name); // Return a State Object
                // console.log(trans.to().name); // Return a State Object
                
                /*
                if(next.name != 'access.signin' && next.name != 'access.signup' && next.name != 'access.forgotpwd'){
                    if (! angular.isUndefinedOrNull(next.data)){
                        var authorizedRoles = next.data.authorizedRoles;
                        if (!AuthService.isAuthorized(authorizedRoles)) {
                            console.log('sdfsf');
                            event.preventDefault();
                            if (AuthService.isAuthenticated()) {
                                // user is not allowed
                                $rootScope.$broadcast(APP_EVENTS.notAuthorized);
                            }
                            else {
                                // user is not logged in
                                $rootScope.$broadcast(APP_EVENTS.notAuthenticated);
                            }
                        }
                    }
                }
                */
            });
            
            $rootScope.$on('$stateNotFound',
                function(event, unfoundState, fromState, fromParams){
                    console.log(unfoundState.to); // "lazy.state"
                    console.log(unfoundState.toParams); // {a:1, b:2}
                    console.log(unfoundState.options); // {inherit:false} + default options
                })
            
            // angular translate
            $rootScope.lang = { isopen: false };
            $rootScope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
            $rootScope.selectLang = $rootScope.langs[$translate.proposedLanguage()] || "English";
            $rootScope.setLang = function(langKey, $event) {
                // set the current lang
                $rootScope.selectLang = $rootScope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $rootScope.lang.isopen = !$rootScope.lang.isopen;
            };

            
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

            function isSmartDevice( $window ) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }
            
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
	
angular.module('webprakash').directive('bindUnsafeHtml', ['$compile',
  function($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'bindUnsafeHtml' expression for changes
          return scope.$eval(attrs.bindUnsafeHtml);
          //return element.children();
        },
        function(value) {
          // when the 'bindUnsafeHtml' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current scope
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
      );
    };
  }
]);
	

angular.module('webprakash').directive('wpDatepicker', function(){
    return {
		restrict: 'EA',
		template: '<p class="input-group">' + 
				'<input type="type" class="form-control" ui-date-format = "dd-MMM-yyyy"  uib-datepicker-popup="{{wpUibDatepickerPopup}}" ng-model="model" is-open="wpIsOpen" datepicker-options="wpDatepickerOptions" ng-required="ngRequired" />' +
				
				// '<input type="text" class="form-control" date-format = "dd-MMM-yyyy HH:mm" datetime-picker="dd-MMM-yyyy HH:mm" ng-model="model" is-open="wpIsOpen" save-as = "a(c)" read-as = "b(c)"/>' +
				
				'<span class="input-group-btn">' + 
				'<button type="button" class="btn btn-default" ng-click="open()"><i class="glyphicon glyphicon-calendar"></i></button>' + 
				'</span>' + 
				'</p>',
		scope: {
			model: "=ngModel",
			wpUibDatepickerPopup: '@?',
			wpDatepickerOptions: '=?',
			ngRequired: '=?',
			wpIsOpen:'@?'
		},
		controller: function($scope){
			
			$scope.a = function(v){
				console.log(v);
			}
			
			$scope.b = function(v){
				console.log(v);
				return Date.parse($scope.model);
			}
		},      
		link: function(scope, element, attrs) {
			if (angular.isUndefinedOrNull(attrs.wpUibDatepickerPopup)){
				scope.wpUibDatepickerPopup = 'dd-MMM-yyyy';
			}
						
			scope.model = Date.parse(attrs.model);
			

							
            scope.open = function() {
				scope.wpIsOpen = true;
			};					
        }
    };
  });	


	
angular.module('webprakash').directive('wpVideoUploader', function(helper, Upload){
    return {
      restrict: 'EA',
      template: '<div class="thumbnail m-b-sm">' +				
				'<video controls ngf-src="tmpImg"></video>' +
                // '<img title = "{{size}} px" id="img_{{$id}}" ngf-min-width = "10" ngf-min-height = "10" ngf-thumbnail="tmpImg || \'c0.jpg\'">' +
                // '<span ng-show = "isLoading" class = "loading_thumb"><p>Loading...</p></span>' +
                '</div>' +
                '<uib-progressbar ng-show = "tmpProgress > 0 && tmpProgress < 100"  value="tmpProgress" class="progress-xxs"></uib-progressbar>' +                    
                '<span class="btn btn-primary" ngf-select="upload($file, \'model\')" ngf-multiple="true" name="file" accept="*.mp4, *.webm, *.ogg" ' +
                    'ngf-min-height="100"  enctype="multipart/form-data">Select Video</span>' +
                '<button title = "{{size}} px" type="button" ng-click = "removeImage()" class="btn btn-default m-l">X</button>' +
                '<input type="hidden" name = "model" ng-model = "model">',
      scope: {
        model: "=ngModel",
        accounts:'@',
        title: '@',
        size: '@'
      },
      controller: function($scope){
          $scope.isLoading = false;
      },      
      link: function($scope, element, attrs) {
            $scope.tmpImg = helper.getUploadedImgURL($scope.model, $scope.size);
            $scope.tmpProgress = 0; 
            
            
            element.find('img').bind("load" , function(e){                          
                $scope.isLoading = false;
                $scope.tmpProgress = 0;
                
                if(this.naturalHeight > this.naturalWidth){
                    this.className = "vertical";
                }
                $scope.$apply();
            });
            
            $scope.removeImage = function(){
                $scope.model = '';
                $scope.tmpImg = helper.getUploadedImgURL($scope.model, $scope.size);              
            }

            $scope.upload = function (file, eleName) {
                var uploadUrl = appConfig.wsUrl + 'default/fileupload';

                Upload.upload({
                    url: uploadUrl,
                    fields: {'eleName': eleName},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.tmpProgress = progressPercentage;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.model = data;
                    $scope.tmpImg = helper.getUploadedImgURL($scope.model, $scope.size); 
                    $scope.isLoading = true;
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + data);
                })
            };
        }
    };
});
	  
	
angular.module('webprakash').directive('wpImgUploader', function(helper, Upload){
    return {
      restrict: 'EA',
      template: '<div class="thumbnail m-b-sm">' +
                '<img title = "{{size}} px" id="img_{{$id}}" ngf-min-width = "10" ngf-min-height = "10" ngf-thumbnail="tmpImg || \'c0.jpg\'">' +
                '<span ng-show = "isLoading" class = "loading_thumb"><p>Loading...</p></span>' +
                '</div>' +
                '<uib-progressbar ng-show = "tmpProgress > 0 && tmpProgress < 100"  value="tmpProgress" class="progress-xxs"></uib-progressbar>' +                    
                '<span class="btn btn-primary" ngf-select="upload($file, \'model\')" ngf-multiple="true" name="file" accept="*.jpg, *.jpeg, *.png, *.gif" ' +
                    'ngf-min-height="100"  enctype="multipart/form-data">Select Image</span>' +
                '<button title = "{{size}} px" type="button" ng-click = "removeImage()" class="btn btn-default m-l">X</button>' +
                '<input type="hidden" name = "model" ng-model = "model">',
      scope: {
        model: "=ngModel",
        accounts:'@',
        title: '@',
        size: '@'
      },
      controller: function($scope){
          $scope.isLoading = false;
      },      
      link: function($scope, element, attrs) {
            $scope.tmpImg = helper.getUploadedImgURL($scope.model, $scope.size);
            $scope.tmpProgress = 0; 
            
            
            element.find('img').bind("load" , function(e){                          
                $scope.isLoading = false;
                $scope.tmpProgress = 0;
                
                if(this.naturalHeight > this.naturalWidth){
                    this.className = "vertical";
                }
                $scope.$apply();
            });
            
            $scope.removeImage = function(){
                $scope.model = '';
                $scope.tmpImg = helper.getUploadedImgURL($scope.model, $scope.size);              
            }

            $scope.upload = function (file, eleName) {
                var uploadUrl = appConfig.wsUrl + 'default/fileupload';

                Upload.upload({
                    url: uploadUrl,
                    fields: {'eleName': eleName},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.tmpProgress = progressPercentage;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.model = data;
                    $scope.tmpImg = helper.getUploadedImgURL($scope.model, $scope.size); 
                    $scope.isLoading = true;
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + data);
                })
            };
        }
    };
  });
  
  
angular.module('webprakash').directive('wpFileUploader', function(helper, Upload){
    return {
      restrict: 'EA',
      template: '<a id="file_{{$id}}" href = "{{tmpFile}}" target = "_new" ng-show = "tmpFile != \'\'">Download</a>&nbsp;&nbsp;' +
                '<uib-progressbar ng-show = "tmpProgress > 0 && tmpProgress < 100"  value="tmpProgress" class="progress-xxs"></uib-progressbar>' +                    
                '<span class="btn btn-primary" ngf-select="upload($file, \'model\')" ngf-multiple="true" name="file" ' +
                    'enctype="multipart/form-data">Select File</span>' +
                '<button type="button" ng-click = "removeFile()" class="btn btn-default m-l">X</button>' +
                '<input type="hidden" name = "model" ng-model = "model">',
      scope: {
        model: "=ngModel",
        accounts:'@',
        title: '@',
        size: '@'
      },
      controller: function($scope){
          $scope.isLoading = false;
      },      
      link: function($scope, element, attrs) {
            $scope.tmpFile = helper.getUploadedFileURL($scope.model);
            $scope.tmpProgress = 0; 
            
            
            element.find('file').bind("load" , function(e){                          
                $scope.isLoading = false;
                $scope.tmpProgress = 0;
                
                if(this.naturalHeight > this.naturalWidth){
                    this.className = "vertical";
                }
                $scope.$apply();
            });
            
            $scope.removeFile = function(){
                $scope.model = '';
                $scope.tmpFile = helper.getUploadedFileURL($scope.model);              
            }

            $scope.upload = function (file, eleName) {
                var uploadUrl = appConfig.wsUrl + 'default/fileupload';

                Upload.upload({
                    url: uploadUrl,
                    fields: {'eleName': eleName},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.tmpProgress = progressPercentage;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.model = data;
                    $scope.tmpFile = helper.getUploadedFileURL($scope.model); 
                    $scope.isLoading = true;
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + data);
                })
            };
        }
    };
  });  
  

angular.module('webprakash').directive('timezonedDate', function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (scope, elem, attrs, ngModel) {
			var toView = function (val) {
				if (val == '')
				{
					return val;
				}

				var frmt = 'DD-MMM-YYYY';
				if (attrs.enableTime === true){
					frmt = 'DD-MMM-YYYY HH:mm';
				}
				val = getDateFromFormat(val, frmt);				
				var offset = moment(val).utcOffset();
				var date = new Date(moment(val).subtract(offset, 'm'));
				var newOffset = moment.tz.zone(attrs.timezone).utcOffset(date);
				var dt = new Date(moment(date).subtract(newOffset, 'm').unix() * 1000);

				return moment(dt).format(frmt);
				
			};

			var toModel = function (val) {
				var frmt = 'DD-MMM-YYYY';
				if (attrs.enableTime === true){
					frmt = 'DD-MMM-YYYY HH:mm';
				}
				var offset = moment(val).utcOffset();
				var date = new Date(moment(val).add(offset, 'm'));
				var newOffset = moment.tz.zone(attrs.timezone).utcOffset(date);
				var dt = moment(date).add(newOffset, 'm').unix() * 1000;				
				return moment(dt).format(frmt);
			};

			ngModel.$formatters.unshift(toView);
			ngModel.$parsers.unshift(toModel);
		}
	};
});

	
angular.module('webprakash').directive('wpDatetimepicker', function(helper){
    return {
		restrict: 'EA',
     			
				
		template:	'<p class="input-group">' +
				'<input type="text" timezoned-date ng-attr-timezone="Europe/London" class="form-control" dateDirective ng-required = "{{required}}" enable-time="enableTime" enable-date="enableDate" datepicker-options = "{dateFormat: \'{{format}}\'}" datetime-picker="{{format}}" ng-model="model" is-open="isOpen"  />' +
				'<span class="input-group-btn">' +
				'<button type="button" class="btn btn-default" ng-click="isOpen = true"><i class="fa fa-calendar"></i></button>' +
				'</span>' +
				'</p>',

		scope: {
			model: "=ngModel",
			format: '@format',
			picker: '@picker',
			enableTime: '=enableTime',
			enableDate: '=enableDate',	
			jsTimeZone: '@jsTimeZone',
			required: "@ngRequired"
		},
		link: function($scope, element, attrs, ngModel){

			//if (val != ''){
				// console.log(attrs);
				console.log($scope.model);
				if ($scope.model !== undefined){
					
					var val = $scope.model;
					
					var offset = moment(val).utcOffset();
					var date = new Date(moment(val).add(offset, 'm'));
					var newOffset = moment.tz.zone(attrs.jsTimeZone).utcOffset(date);
					var dt = moment(date).add(newOffset, 'm').unix() * 1000;
					$scope.model = moment(dt).format('DD-MMM-YYYY');
					// $scope.model = new Date(dt);
					
					
				}
			//}


			//var offset = moment($scope.model).utcOffset();
			//var date = new Date(moment($scope.model).add(offset, 'm'));
			//var newOffset = moment.tz.zone(attrs.timezone).offset(date);
			//var dt = moment(date).add(newOffset, 'm').unix() * 1000;
			//$scope.model = moment($scope.model).format('DD-MMM-YYYY');

			// $scope.model = new Date($scope.model);
			// console.log($scope.model);

			if (angular.isUndefinedOrNull(attrs.required)){
				$scope.required = "false";				
			}
			else {
				$scope.required = "true";
			}
		}
			
    };
  });
  
angular.module('webprakash').directive('wp-orientable', function () {       
    return {
        link: function(scope, element, attrs) { 
            element.on("load" , function(e){ 
                if(this.naturalHeight > this.naturalWidth){
                    this.className = "vertical";
                }
            });
        }
    }
});


angular.module('webprakash').directive('wpTrueValue', [function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
				
		ngModel.$formatters.push(function(value) {
			return value == 1 ? true : false;
		});
  
	
		ngModel.$parsers.push(function(v){		
			console.log(v);
			return v ? scope.$eval(attrs.wpTrueValue) : scope.$eval(attrs.wpFalseValue);
		});
    }
  };
}]);

