'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$translate', '$localStorage', '$window', 'AuthService', '$state', '$cookieStore','toaster', 'ActiveProject',

    function($scope, $rootScope, $translate, $localStorage, $window, AuthService, $state, $cookieStore, toaster, ActiveProject) {
            $scope.ActiveProject = ActiveProject;
            $scope.authError = null;

            $scope.logout = function (){
                AuthService.logout();
                if(! $state.includes('access.signin')){
                    $state.go('access.signin');
                };
            }

            $scope.getHeader = function (){
                var utype = AuthService.getPayload().utype;
                return appConfig.appUrl + appConfig.templatePath.backend + '/' + MODULES + utype + '/' + TPL + 'blocks/header.html';
            }

            $scope.getAside = function(){
                var utype = AuthService.getPayload().utype;
                return appConfig.appUrl + appConfig.templatePath.backend + '/' + MODULES +  utype + '/' + TPL + 'blocks/aside.html';
            }

            $scope.getNav = function(){
                var utype = AuthService.getPayload().utype;
                return appConfig.appUrl + appConfig.templatePath.backend + '/' + MODULES +  utype + '/' + TPL + 'blocks/nav.html';
            }

            $scope.getSettings = function(){
                var utype = AuthService.getPayload().utype;
                return appConfig.appUrl + appConfig.templatePath.backend + '/' + MODULES +  utype + '/blocks/settings.html';
            }



            // config
			
			
            $scope.app = {
                appConfig: appConfig,
                authData: AuthService.getPayload().rs,
				globalParam: {
					dateForamt: /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
				},
                name: appConfig.appTitle,
                version: '1.3.3',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info:    '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger:  '#f05050',
                    light:   '#e8eff0',
                    dark:    '#3a3f51',
                    black:   '#1c2b36'
                },

                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-white',
                    asideColor: 'bg-black',
                    headerFixed: true,
                    asideFixed: false,
                    asideFolded: false,
                    asideDock: false,
                    container: false
                }
            }

            // save settings to local storage
            if ( angular.isDefined($localStorage.settings) ) {
                $scope.app.settings = $localStorage.settings;
            } else {
                $localStorage.settings = $scope.app.settings;
            }

            $scope.$watch('app.settings', function(){
                if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
                    // aside dock and fixed must set the header fixed.
                    $scope.app.settings.headerFixed = true;
                }
                // save to local storage
                $localStorage.settings = $scope.app.settings;
            }, true);


    }]);
