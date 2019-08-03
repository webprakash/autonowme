'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
  
angular.module('app')
  .filter('usFormat', function() {
    return function(date) {
      return moment(date, 'DD-MMM-YYYY').format('MM/DD/YYYY');
    }
  });