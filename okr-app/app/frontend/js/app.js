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


    var isLoggedIn = function ($q, $timeout, $http, $rootScope, $window, $location) {

      var deferred = $q.defer();

      $http.get('/verify').then(
        function (user) {
          $rootScope.isSignedIn = true;
          $rootScope.currentUser = user;
          $timeout(deferred.resolve, 0);
          $location.url('/okr');
        },
        function(err) {
          $rootScope.isSignedIn = false;
          $rootScope.currentUser = {};
          $timeout(function() { deferred.reject();}, 0);
          $window.location.href = '/auth/google';
        }
      );
      return deferred.promise;
    };


    $httpProvider.interceptors.push('InterceptorService');


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/okr', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        resolve: { loggedin: isLoggedIn }
      });


    $locationProvider.html5Mode(true);

  }]);
