'use strict';

var app = angular.module('okrs', [
  'ngRoute',
  'ngResource',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ui.bootstrap'
]);


app.config(['$routeProvider', '$locationProvider', '$httpProvider',

  function ($routeProvider, $locationProvider, $httpProvider) {



    var verifyLogin = function ($q, $http, $timeout, $location, authService) {

      var deferred = $q.defer();



      $http.get('/verify').then(
        function (response) {
          authService.setUserInfo(response.data);
          $timeout(deferred.resolve, 0);
          $location.path('/okr');
        },
        function(err) {
          authService.setUserInfo(null);
          $timeout(deferred.reject, 0);
          $location.path('/');
        }
      );

      return deferred;
    };

    $httpProvider.interceptors.push('InterceptorService');


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: { loggedin: verifyLogin }
      })
      .when('/okr', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        resolve: { loggedin: verifyLogin }
      });


    $locationProvider.html5Mode(true);

  }]);
