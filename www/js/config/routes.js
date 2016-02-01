(function() {
  'use strict';

  angular.module('starter').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {    

      $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/html/abstract.html',
        controller: 'applicationController'
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'views/html/search.html'
          }
        }
      })
      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'views/html/browse.html'
          }
        }
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
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/playlists');

  }]);
})();