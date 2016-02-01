'use strict';

angular.module('start')
  .factory('authenticationService', function (Restangular, localStorageService, $rootScope, AUTH_EVENTS, $state, USER_TYPES){

    var service = {};
    var agents = Restangular.all('agents');
    var admins = Restangular.all('agency_admins');

    service.loginAgents = function (email, password) {
      var data = {
        email: email,
        password: password
      };
      return agents.customPOST({agent: data}, 'sign_in');
    };

    service.loginAdmins = function (email, password) {
      var data = {
        email: email,
        password: password
      };
      return admins.customPOST({agencyAdmin: data}, 'sign_in');
    };

    service.getEventTypes = function () {
      return AUTH_EVENTS;
    };

    service.getCurrentUser = function () {
      var currentUser = localStorageService.get('currentUser');
      if(currentUser){
        localStorageService.bind($rootScope, 'currentUser');
        var header = {};
        if($rootScope.currentUser.userType === USER_TYPES.agent){
          header['X-Agent-TOKEN'] = $rootScope.currentUser.token;
        }else {
          header['X-AgencyAdmin-TOKEN'] = $rootScope.currentUser.token;
        }
        Restangular.setDefaultHeaders(header);
        return currentUser;
      }
      return false;
    };

    service.authEventAction = function (type, param) {

      switch (type){
        case AUTH_EVENTS.loginSuccess: {
          localStorageService.set('currentUser', param);
          service.getCurrentUser();
          var state = '';
          if($rootScope.currentUser.userType === USER_TYPES.admin){
              if(angular.equals($rootScope.currentUser.user.team, {})){
                state = 'app.admins.createTeam';
              }else {
                state = 'app.admins.main';
              }
          }else {
            state = 'app.agents.main';
          }
          $state.go(state);
          break;
        }
        case AUTH_EVENTS.notAuthenticated: {
          $state.go('login');
          break;
        }
        case AUTH_EVENTS.notAuthorized: {

          break;
        }
      }
    };

    return service;
  });
