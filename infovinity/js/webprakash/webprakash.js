angular.module('helper', []);

angular.module('helper').factory('helper', function () {
    
	var factory = {}; 
	
	factory.getModulePath = function(mPath){
		return MODULES + mPath.split('.').join('/' + MODULES) + '/';
	};

	factory.getRemoteURL = function(mFile){
		return appConfig.engineUrl + mFile;
	};

	factory.getLetterIcon = function(mName){
		return getRemoteURL('img/letters/material/A.png');
	};
    
    return factory;
});

angular.module('webprakash', ['angular-jwt', 'helper']);

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
        return window.sessionStorage.getItem('rmsToken');
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
            headers: { 'Authorization': window.sessionStorage.getItem('rmsToken') }
        });
    })

angular.module('webprakash').service('tokenService', function ($http) {
    this.saveToken = function(data){
        if (! angular.isUndefinedOrNull(data)){
            var rmsToken = data;
            window.sessionStorage.setItem("rmsToken", data);
            $.ajaxSetup({
                headers: { 'Authorization': rmsToken }
            });
            return;
        }
        window.sessionStorage.removeItem("rmsToken");
    }

    this.getToken = function(){

        if (window.sessionStorage.getItem('rmsToken') != null && window.sessionStorage.getItem('rmsToken') != undefined){
            var rmsToken = window.sessionStorage.getItem('rmsToken');
            if (! angular.isUndefinedOrNull(rmsToken)){
                return rmsToken;
            }
        }
        return false;
    }

    this.destroyToken = function(){
        window.sessionStorage.removeItem("rmsToken");
    }
});

angular.module('webprakash').factory('AuthService', function ($http, tokenService, jwtHelper) {   
    
    var authService = {};

    authService.login = function (credentials) {
        return $http.post(appConfig.wsUrl + 'default/jwtlogin', credentials)
            .then(function (res) {
                tokenService.saveToken(res.data);
                return res.data;
            });
    };

    authService.isAuthenticated = function () {
        var rmsToken = tokenService.getToken();

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

        if(tokenService.getToken()) {
            var tokenPayload = jwtHelper.decodeToken(tokenService.getToken());
            return (authService.isAuthenticated() && authorizedRoles.indexOf(tokenPayload.userRole) !== -1);
        }

        return false;
    };

    authService.getPayload = function(){
        if(tokenService.getToken()) {
            var tokenPayload = jwtHelper.decodeToken(tokenService.getToken());
            return tokenPayload;
        }

        return false;
    }

    authService.logout = function(){
        tokenService.destroyToken();
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
                window.sessionStorage.setItem("rmsToken", response.data.rmsToken);
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
    var urlBase = appConfig.wsModuleUrl;
    var dataFactory = {};

    dataFactory.getData = function (url, params) {
        return $http.get(urlBase + url, params);
    };

    dataFactory.postData = function (url, params) {
        return $http.post(urlBase + url, params);
    };

    return dataFactory;
}]);

angular.module('webprakash').run(['$rootScope', '$transitions', '$state', '$stateParams', '$translate', '$localStorage', '$window', 'AuthService', '$cookieStore', 'toaster', 'helper',
        function ($rootScope, $transitions, $state, $stateParams, $translate, $localStorage, $window, AuthService, $cookieStore, toaster, helper) {
			
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
                    $state.go('access.signin');
                }
            });

            $rootScope.$on('app-not-authenticated', function(event, mass) {
                if(! $state.includes('access.signin')){
                    event.preventDefault();
                    $state.go('access.signin');
                }
            });

            $rootScope.$on('app-not-authorized', function(event, mass) {
                if(! $state.includes('access.signin')){
                    $state.go('access.signin');
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
