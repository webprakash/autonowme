// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   helper.getRemoteURL('libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js')],
      sparkline:      [   helper.getRemoteURL('libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js')],
      plot:           [   helper.getRemoteURL('libs/jquery/flot/jquery.flot.js'),
                          helper.getRemoteURL('libs/jquery/flot/jquery.flot.pie.js'), 
                          helper.getRemoteURL('libs/jquery/flot/jquery.flot.resize.js'),
                          helper.getRemoteURL('libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js'),
                          helper.getRemoteURL('libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js'),
                          helper.getRemoteURL('libs/jquery/flot-spline/js/jquery.flot.spline.min.js')],
      moment:         [   helper.getRemoteURL('libs/jquery/moment/moment.js')],
      screenfull:     [   helper.getRemoteURL('libs/jquery/screenfull/dist/screenfull.min.js')],
      slimScroll:     [   helper.getRemoteURL('libs/jquery/slimscroll/jquery.slimscroll.min.js')],
      sortable:       [   helper.getRemoteURL('libs/jquery/html5sortable/jquery.sortable.js')],
      nestable:       [   helper.getRemoteURL('libs/jquery/nestable/jquery.nestable.js'),
                          helper.getRemoteURL('libs/jquery/nestable/jquery.nestable.css')],
      filestyle:      [   helper.getRemoteURL('libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js')],
      slider:         [   helper.getRemoteURL('libs/jquery/bootstrap-slider/bootstrap-slider.js'),
                          helper.getRemoteURL('libs/jquery/bootstrap-slider/bootstrap-slider.css')],
      chosen:         [   helper.getRemoteURL('libs/jquery/chosen/chosen.jquery.min.js'),
                          helper.getRemoteURL('libs/jquery/chosen/bootstrap-chosen.css')],
      TouchSpin:      [   helper.getRemoteURL('libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js'),
                          helper.getRemoteURL('libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css')],
      wysiwyg:        [   helper.getRemoteURL('libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js'),
                          helper.getRemoteURL('libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js')],
	/*						
      dataTable:      [   '../libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                          '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
	*/					  
      vectorMap:      [   helper.getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js'), 
                          helper.getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js'),
                          helper.getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js'),
                          helper.getRemoteURL('libs/jquery/bower-jvectormap/jquery-jvectormap.css')],
      footable:       [   helper.getRemoteURL('libs/jquery/footable/v3/js/footable.min.js'),
                          helper.getRemoteURL('libs/jquery/footable/v3/css/footable.bootstrap.min.css')],
      fullcalendar:   [   helper.getRemoteURL('libs/jquery/moment/moment.js'),
                          helper.getRemoteURL('libs/jquery/fullcalendar/dist/fullcalendar.min.js'),
                          helper.getRemoteURL('libs/jquery/fullcalendar/dist/fullcalendar.css'),
                          helper.getRemoteURL('libs/jquery/fullcalendar/dist/fullcalendar.theme.css')],
      daterangepicker:[   helper.getRemoteURL('libs/jquery/moment/moment.js'),
                          helper.getRemoteURL('libs/jquery/bootstrap-daterangepicker/daterangepicker.js'),
                          helper.getRemoteURL('libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css')],
      tagsinput:      [   helper.getRemoteURL('libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js'),
                          helper.getRemoteURL('libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css')]
                      
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'ngGrid',
          files: [
              helper.getRemoteURL('libs/angular/ng-grid/build/ng-grid.min.js'),
              helper.getRemoteURL('libs/angular/ng-grid/ng-grid.min.css'),
              helper.getRemoteURL('libs/angular/ng-grid/ng-grid.bootstrap.css')
          ]
      },
      {
          name: 'ui.grid',
          files: [
              helper.getRemoteURL('libs/angular/angular-ui-grid/ui-grid.min.js'),
              helper.getRemoteURL('libs/angular/angular-ui-grid/ui-grid.min.css'),
              helper.getRemoteURL('libs/angular/angular-ui-grid/ui-grid.bootstrap.css')
          ]
      },
      {
          name: 'ui.select',
          files: [
              helper.getRemoteURL('libs/angular/angular-ui-select/dist/select.min.js'),
              helper.getRemoteURL('libs/angular/angular-ui-select/dist/select.min.css')
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            helper.getRemoteURL('libs/angular/angular-file-upload/angular-file-upload.js')
          ]
      },
      {
          name:'ui.calendar',
          files: [helper.getRemoteURL('libs/angular/angular-ui-calendar/src/calendar.js')]
      },
      {
          name: 'ngImgCrop',
          files: [
              helper.getRemoteURL('libs/angular/ngImgCrop/compile/minified/ng-img-crop.js'),
              helper.getRemoteURL('libs/angular/ngImgCrop/compile/minified/ng-img-crop.css')
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              helper.getRemoteURL('libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js'),
              helper.getRemoteURL('libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css')
          ]
      },
      {
          name: 'toaster',
          files: [
              helper.getRemoteURL('libs/angular/angularjs-toaster/toaster.js'),
              helper.getRemoteURL('libs/angular/angularjs-toaster/toaster.css')
          ]
      },
      {
          name: 'textAngular',
          files: [
              helper.getRemoteURL('libs/angular/textAngular/dist/textAngular-sanitize.min.js'),
              helper.getRemoteURL('libs/angular/textAngular/dist/textAngular.min.js')
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              helper.getRemoteURL('libs/angular/venturocket-angular-slider/build/angular-slider.min.js'),
              helper.getRemoteURL('libs/angular/venturocket-angular-slider/build/angular-slider.css')
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              helper.getRemoteURL('libs/angular/videogular/videogular.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              helper.getRemoteURL('libs/angular/videogular-controls/controls.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              helper.getRemoteURL('libs/angular/videogular-buffering/buffering.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              helper.getRemoteURL('libs/angular/videogular-overlay-play/overlay-play.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              helper.getRemoteURL('libs/angular/videogular-poster/poster.min.js')
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              helper.getRemoteURL('libs/angular/videogular-ima-ads/ima-ads.min.js')
          ]
      },
      {
          name: 'xeditable',
          files: [
              helper.getRemoteURL('libs/angular/angular-xeditable/dist/js/xeditable.min.js'),
              helper.getRemoteURL('libs/angular/angular-xeditable/dist/css/xeditable.css')
          ]
      },
      {
          name: 'smart-table',
          files: [
              helper.getRemoteURL('libs/angular/angular-smart-table/dist/smart-table.min.js')
          ]
      },
      {
          name: 'angular-skycons',
          files: [
              helper.getRemoteURL('libs/angular/angular-skycons/angular-skycons.js')
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
