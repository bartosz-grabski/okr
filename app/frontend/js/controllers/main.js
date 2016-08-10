'use strict';

angular.module('okrs')
  .controller('MainCtrl', function ($scope, $rootScope, $cookieStore, $window, authService) {
	$rootScope.pageTitle = 'Homepage';

    console.log($cookieStore.get('session'));

    $scope.auth = authService;

  });
