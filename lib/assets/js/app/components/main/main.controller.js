
(function(){
    'use strict';
    angular.module('bookstore').controller('MainController', MainController);

    var inject = ['$rootScope'];
    function MainController($rootScope) {

        var vm = this;

        vm.showLoading = false;

        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeStart(event, nextState, currentState) {
            if (nextState.resolve) {
                vm.showLoading = true;
            }
        }

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            if (toState.resolve) {
                vm.showLoading = false;
            }
        }
    }
    MainController.$inject = inject;
})();

