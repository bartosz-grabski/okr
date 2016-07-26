'use strict';

angular.module('okrs')
  .controller('MainCtrl', function ($rootScope, $cookieStore) {
	$rootScope.pageTitle = 'Homepage';

    console.log($cookieStore.get('sessionID'))
  });
