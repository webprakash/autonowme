angular.module('app').directive('footableRefresh', function(){
    return function(scope, element){
        var footableTable = element.parents('table');

        if( !scope.$last ) {
            return false;
        }

        scope.$evalAsync(function(){
            if (! footableTable.hasClass('footable-loaded')) {
                footableTable.footable();
            }
            //footableTable.trigger('footable_initialized');
            //footableTable.trigger('footable_resize');
            footableTable.data('footable').redraw();
        });
    };
})