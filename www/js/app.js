(function(){
  'use strict';

  angular
    .module('starter', ['ionic', 'restangular', 'LocalStorageModule'])
      .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

          }
          if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
          }
        });

        authService.getCurrentUser();
        // on changeStart, check if user has authenticated himself
        $rootScope.$on('$stateChangeStart', function (event, next) {
          if(next.data && next.data.authRequired && !$rootScope.currentUser){
            event.preventDefault();
            authService.authEventAction(authService.getEventTypes().notAuthenticated);
          }

          if(next.data && next.data.authRoles !== $rootScope.currentUser.userType){
            event.preventDefault();
            authService.authEventAction(authService.getEventTypes().notAuthorized);
          }
        });
        
      });

})();

