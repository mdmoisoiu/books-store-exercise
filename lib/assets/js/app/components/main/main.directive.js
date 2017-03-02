(function(){
    'use strict';
    angular.module('bookstore').directive('main', MainDirective);

    function MainDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/main/main.html'
        };
    }

})();

