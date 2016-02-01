(function() {
  'use strict';

  angular.module('start')
    // .constant('API_URL', 'http://192.168.1.132:3000/api/v1')
    .constant('API_URL', 'http://altour-staging.herokuapp.com/api/v1')
    // .constant('API_URL', 'http://localhost:3000/api/v1')
    .constant('AUTH_EVENTS', {
      loginSuccess: 'login-success',
      notAuthenticated: 'authentication-required',
      notAuthorized: 'not-authorized'
    })
    .constant('USER_TYPES', {
      agent: 1,
      admin: 2
    });

})();
