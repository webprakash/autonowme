module.exports = {
    libs:{
        files:[
            {
                src:  [
                    'angular/angular.js',
					'angular/angular.min.js',
					
                    'angular-animate/angular-animate.js',
					'angular-animate/angular-animate.min.js',
					
                    'angular-aria/angular-aria.js',
					'angular-aria/angular-aria.min.js',
					
					'angular-bootstrap/ui-bootstrap-tpls.js',
					'angular-bootstrap/ui-bootstrap-tpls.min.js',
					
					'angular-bootstrap-nav-tree/dist/**',
					
                    'angular-cookies/angular-cookies.js',
					'angular-cookies/angular-cookies.min.js',
					
					'angular-datatables/dist/**',	
					
					'angular-file-upload/angular-file-upload.js',
					'angular-file-upload/angular-file-upload.min.js',
					
					'AngularJS-Toaster/toaster.css',
					'AngularJS-Toaster/toaster.min.css',
					'AngularJS-Toaster/toaster.js',
					'AngularJS-Toaster/toaster.min.js',
					
					'angular-jwt/dist/**',
					
					'angular-loading-bar/build/**',  
					
					'angular-material/angular-material.css',
					'angular-material/angular-material.js',
					'angular-material/angular-material.min.js',
                    
					'angular-messages/angular-messages.js',
					'angular-messages/angular-messages.min.js',
					
					'angular-resource/angular-resource.js',
					'angular-resource/angular-resource.min.js',
					
                    'angular-sanitize/angular-sanitize.js',
					'angular-sanitize/angular-sanitize.min.js',
                    
					'angular-skycons/angular-skycons.js',
					'angular-skycons/angular-skycons.min.js',
					
					'angular-smart-table/dist/**',
                    
                    'angular-touch/angular-touch.js',
					'angular-touch/angular-touch.min.js',
					
					'angular-translate/angular-translate.js',
					'angular-translate/angular-translate.min.js',
                    
                    'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
					'angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
					
					'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
					'angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
					
					'angular-translate-storage-local/angular-translate-storage-local.js',
					'angular-translate-storage-local/angular-translate-storage-local.min.js',
					
					'angular-ui-calendar/src/calendar.js',
					
					'angular-ui-grid/ui-grid.*',
					
					'angular-ui-map/ui-map.js',
					'angular-ui-map/ui-map.min.js',
					
					'angular-ui-router/release/**',
					
					'angular-ui-select/dist/**',
					
					'angular-ui-tinymce/src/**',
					'angular-ui-tinymce/dist/**',
					
					'angular-ui-utils/ui-utils.*',
					
					'angular-ui-validate/dist/**',
					
					'angular-xeditable/dist/**',
					
					'angular-bootstrap-datetimepicker/src/**',
					'angular-date-time-input/src/**',
					'bootstrap-ui-datetime-picker/dist/**',
					
					'jquery.easy-pie-chart/dist/**',
					
					'ngBootbox/dist/**',
					
					'ng-file-upload/ng-file-upload.js',
					'ng-file-upload/ng-file-upload.min.js',
					
					'ng-grid/build/**',
                    'ng-grid/ng-grid.min.css',
					
					'ngImgCrop/compile/**',
					
					'ngstorage/ngStorage.js',
					'ngstorage/ngStorage.min.js',
					
					'oclazyload/dist/**',
					
					'textAngular/dist/**',
					
					'venturocket-angular-slider/build/**',
					
					'videogular/videogular.min.js',
                    'videogular-controls/controls.min.js',
                    'videogular-buffering/buffering.min.js',
                    'videogular-overlay-play/overlay-play.min.js',
                    'videogular-poster/poster.min.js',
                    'videogular-ima-ads/ima-ads.min.js',
					
					'highcharts-ng/dist/highcharts-ng.min.js',
					
					'angular-fusioncharts/dist/angular-fusioncharts.min.js',
					
					'ngmap/build/scripts/ng-map.min.js',
					
					'ng-js-tree/dist/ngJsTree.min.js'
										
                ],
                dest: 'infovinity/libs/angular',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
					'bootbox/bootbox.js',	
					
					'bootstrap/dist/**',
					
					'bootstrap-daterangepicker/daterangepicker.js',
                    'bootstrap-daterangepicker/daterangepicker.css',
					
					'bootstrap-filestyle/src/bootstrap-filestyle.js',
					
					'bootstrap-slider/bootstrap-slider.css',
					'bootstrap-slider/bootstrap-slider.js',
                    
					'bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
					'bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
					'bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js',
					'bootstrap-tagsinput/dist/bootstrap-tagsinput-angular.js',
					'bootstrap-tagsinput/dist/bootstrap-tagsinput-angular.min.js',
					
					'bootstrap-touchspin/dist/**',
					
					'bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'bootstrap-wysiwyg/external/jquery.hotkeys.js',
					
					'bower-jvectormap/*.js',
					
					'chosen/chosen.jquery.js',
					'chosen/chosen.jquery.min.js',
					
					'datatables.net/js/**',
					'datatables.net-bs/js/**',
					'datatables.net-bs/css/**',
					
					'datatables.net-autofill/js/**',
					'datatables-autofill-bootstrap/js/**',					
					
					'datatables.net-buttons/js/**',
					'datatables.net-buttons-bs/js/**',
					'datatables.net-buttons-bs/css/**',
					
					'datatables.net-colreorder/js/**',
					'datatables.net-colreorder-bs/js/**',
					'datatables.net-colreorder-bs/css/**',
					
					'datatables.net-dt/js/**',
					
					'datatables.net-fixedcolumns/js/**',
					'datatables.net-fixedcolumns-bs/js/**',
					'datatables.net-fixedcolumns-bs/css/**',
					
					'datatables.net-keytable/js/**',
					'datatables.net-keytable-bs/js/**',
					'datatables.net-keytable-bs/css/**',
					
					'datatables.net-responsive/js/**',
					'datatables.net-responsive-bs/js/**',
					'datatables.net-responsive-bs/css/**',
					
					'datatables.net-rowgroup/js/**',
					'datatables.net-rowgroup-bs/js/**',
					'datatables.net-rowgroup-bs/css/**',
					
					'datatables.net-rowreorder/js/**',
					'datatables.net-rowreorder-bs/js/**',
					'datatables.net-rowreorder-bs/css/**',
					
					'datatables.net-scroller/js/**',
					'datatables.net-scroller-bs/js/**',
					'datatables.net-scroller-bs/css/**',
					
					'datatables.net-select/js/**',
					'datatables.net-select-bs/js/**',
					'datatables.net-select-bs/css/**',
					
					'flot/jquery.flot.js',
                    'flot/jquery.flot.resize.js',
                    'flot/jquery.flot.pie.js',
                    'flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'flot-spline/js/jquery.flot.spline.min.js',
                    'flot.orderbars/js/jquery.flot.orderBars.js',
					
                    'footable/dist/*',
                    'footable/css/**',

					'fullcalendar/dist/fullcalendar.js',
					'fullcalendar/dist/fullcalendar.min.js',

					'html5sortable/jquery.sortable.js',
					'html5sortable/jquery.sortable.min.js',
									
                    'jquery/dist/jquery.js',
					'jquery/dist/jquery.min.js',
					
					'jquery_appear/jquery.appear.js',
					
					'moment/moment.js',
					'moment/min/moment.min.js',
					
					'nestable/jquery.nestable.js',
					
					'plugins/integration/bootstrap/3/dataTables.bootstrap.*',
                    'plugins/integration/bootstrap/images/**',
					
					'screenfull/dist/**',			

					'slimscroll/jquery.slimscroll.js',
					'slimscroll/jquery.slimscroll.min.js',
					
					'tinymce/**',					
					
					'highcharts/**',

					'fusioncharts/**',

					'fusionmaps/**',
					
					'jstree/dist/**'
								
                ],
                dest: 'infovinity/libs/jquery',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'animate.css/animate.css',
                    'font-awesome/css/**',
                    'font-awesome/fonts/**',
                    'simple-line-icons/css/**',
                    'simple-line-icons/fonts/**',
                    'bootstrap-rtl/dist/css/bootstrap-rtl.min.css'
                ],
                dest: 'infovinity/libs/assets',
                cwd:  'bower_components',
                expand: true
            },
            {src: '**', cwd: 'bower_components/bootstrap/dist/fonts', dest: 'infovinity/fonts', expand: true}
        ]
    }
};
