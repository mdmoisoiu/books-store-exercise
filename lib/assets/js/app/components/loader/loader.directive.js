
(function(){
    'use strict';
    angular.module('bookstore').directive('loader', LoaderDirective);

    function LoaderDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/loader/loader.html'
        };
    }

})();

