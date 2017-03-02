(function(){
  'use strict';
  angular.module('bookstore.templates', []);

  angular.module('bookstore', [
          'ui.router',
          'bookstore.templates'
      ]).config([ '$urlRouterProvider', function($urlRouterProvider) {

          $urlRouterProvider.otherwise("/books");
      }
  ]);

})();
