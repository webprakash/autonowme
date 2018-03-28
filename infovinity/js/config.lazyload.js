// lazyload config

angular.module('webprakash')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   getRemoteURL('libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js')],
      sparkline:      [   getRemoteURL('libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js')],
      plot:           [   getRemoteURL('libs/jquery/flot/jquery.flot.js'),
                          getRemoteURL('libs/jquery/flot/jquery.flot.pie.js'), 
                          getRemoteURL('libs/jquery/flot/jquery.flot.resize.js'),
                          getRemoteURL('libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js'),
                          getRemoteURL('libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js'),
                          getRemoteURL('libs/jquery/flot-spline/js/jquery.flot.spline.min.js')],
      moment:         [   getRemoteURL('libs/jquery/moment/moment.js')],
      screenfull:     [   getRemoteURL('libs/jquery/screenfull/dist/screenfull.min.js')],
      slimScroll:     [   getRemoteURL('libs/jquery/slimscroll/jquery.slimscroll.min.js')],
      sortable:       [   getRemoteURL('libs/jquery/html5sortable/jquery.sortable.js')],
      nestable:       [   getRemoteURL('libs/jquery/nestable/jquery.nestable.js'),
                          getRemoteURL('libs/jquery/nestable/jquery.nestable.css')],
      filestyle:      [   getRemoteURL('libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js')],
      slider:         [   getRemoteURL('libs/jquery/bootstrap-slider/bootstrap-slider.js'),
                          getRemoteURL('libs/jquery/bootstrap-slider/bootstrap-slider.css')],
      chosen:         [   getRemoteURL('libs/jquery/chosen/chosen.jquery.min.js'),
                          getRemoteURL('libs/jquery/chosen/bootstrap-chosen.css')],
      TouchSpin:      [   getRemoteURL('libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js'),
                          getRemoteURL('libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css')],
      wysiwyg:        [   getRemoteURL('libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js'),
                          getRemoteURL('libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js')],
	/*						
      dataTable:      [   '../libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                          '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
	*/					  
      vectorMap:      [   getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js'), 
                          getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js'),
                          getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js'),
                          getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap.css')],
      footable:       [   getRemoteURL('libs/jquery/footable/v3/js/footable.min.js'),
                          getRemoteURL('libs/jquery/footable/v3/css/footable.bootstrap.min.css')],
      fullcalendar:   [   getRemoteURL('libs/jquery/moment/moment.js'),
                          getRemoteURL('libs/jquery/fullcalendar/dist/fullcalendar.min.js'),
                          getRemoteURL('libs/jquery/fullcalendar/dist/fullcalendar.css'),
                          // getRemoteURL('libs/jquery/fullcalendar/dist/fullcalendar.theme.css')],
      daterangepicker:[   getRemoteURL('libs/jquery/moment/moment.js'),
                          getRemoteURL('libs/jquery/bootstrap-daterangepicker/daterangepicker.js'),
                          getRemoteURL('libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css')],
      tagsinput:      [   getRemoteURL('libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js'),
                          getRemoteURL('libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css')]
                      
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'ngGrid',
          files: [
              getRemoteURL('libs/angular/ng-grid/build/ng-grid.min.js'),
              getRemoteURL('libs/angular/ng-grid/ng-grid.min.css'),
              getRemoteURL('libs/angular/ng-grid/ng-grid.bootstrap.css')
          ]
      },
      {
          name: 'ui.grid',
          files: [
              getRemoteURL('libs/angular/angular-ui-grid/ui-grid.min.js'),
              getRemoteURL('libs/angular/angular-ui-grid/ui-grid.min.css'),
              getRemoteURL('libs/angular/angular-ui-grid/ui-grid.bootstrap.css')
          ]
      },
      {
          name: 'ui.select',
          files: [
              getRemoteURL('libs/angular/angular-ui-select/dist/select.min.js'),
              getRemoteURL('libs/angular/angular-ui-select/dist/select.min.css')
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            getRemoteURL('libs/angular/angular-file-upload/angular-file-upload.js')
          ]
      },
      {
          name:'ui.calendar',
          files: [getRemoteURL('libs/angular/angular-ui-calendar/src/calendar.js')]
      },
      {
          name: 'ngImgCrop',
          files: [
              getRemoteURL('libs/angular/ngImgCrop/compile/minified/ng-img-crop.js'),
              getRemoteURL('libs/angular/ngImgCrop/compile/minified/ng-img-crop.css')
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              getRemoteURL('libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js'),
              getRemoteURL('libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css')
          ]
      },
      {
          name: 'toaster',
          files: [
              getRemoteURL('libs/angular/angularjs-toaster/toaster.js'),
              getRemoteURL('libs/angular/angularjs-toaster/toaster.css')
          ]
      },
      {
          name: 'textAngular',
          files: [
              getRemoteURL('libs/angular/textAngular/dist/textAngular-sanitize.min.js'),
              getRemoteURL('libs/angular/textAngular/dist/textAngular.min.js')
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              getRemoteURL('libs/angular/venturocket-angular-slider/build/angular-slider.min.js'),
              getRemoteURL('libs/angular/venturocket-angular-slider/build/angular-slider.css')
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              getRemoteURL('libs/angular/videogular/videogular.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              getRemoteURL('libs/angular/videogular-controls/controls.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              getRemoteURL('libs/angular/videogular-buffering/buffering.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              getRemoteURL('libs/angular/videogular-overlay-play/overlay-play.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              getRemoteURL('libs/angular/videogular-poster/poster.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              getRemoteURL('libs/angular/videogular-ima-ads/ima-ads.min.js')
          ]
      },
      {
          name: 'xeditable',
          files: [
              getRemoteURL('libs/angular/angular-xeditable/dist/js/xeditable.min.js'),
              getRemoteURL('libs/angular/angular-xeditable/dist/css/xeditable.css')
          ]
      },
      {
          name: 'smart-table',
          files: [
              getRemoteURL('libs/angular/angular-smart-table/dist/smart-table.min.js')
          ]
      },
      {
          name: 'angular-skycons',
          files: [
              getRemoteURL('libs/angular/angular-skycons/angular-skycons.js')
          ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;
