(function() {
  'use strict';

  angular.module('starter').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {    

      $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/html/menu.html',
        controller: 'applicationController'
      })      
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'views/html/playlists.html',
            controller: 'playlistsController'
          }
        }
      })
      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'views/html/playlist.html',
            controller: 'playlistController'
          }
        }
      });

      $stateProvider
      .state('different', {
        url: '/different',
        abstract: true,
        templateUrl: 'views/html/abstract.html'
      }) 
      .state('different.search', {
        url: '/search',
        templateUrl: 'views/html/search.html'
      })
      .state('different.browse', {
        url: '/browse',
        templateUrl: 'views/html/browse.html'        
      })
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/playlists');

  }]);
})();