'use strict';

angular.module('okrs')
	.controller('AdminCtrl', function($rootScope, $scope, $http, $window) {

		$rootScope.pageTitle = 'Admin | ' + $rootScope.currentUser.fullname;
		$scope.errorMessage = '';
		$scope.objectives = [];

		var read = function () {
			$http.get('/objective').success(function (objectives) {
				if (objectives === '0') {
					$scope.objectives= [];
					$scope.errorMessage ='There\'s no tasks in the database. Create one if you want !';
				} else {
          $scope.objectives = objectives;
					$scope.errorMessage ='';
				}
			}).error(function (error, status) {
					$scope.errorMessage = error + ' (code:' + status + ')';
			});
		};

		$scope.create = function () {
			var prompt = $window.prompt('Create a new objective :', 'Task Name');
			if (prompt !== null ) {
				$http.post('/objective', {name: prompt, userEmail: $rootScope.currentUser.email}).success(function () {
					read();
				}).error(function (error, status) {
					$scope.errorMessage = error + ' (code:' + status + ')';
				});
			}
		};

		$scope.edit = function (objectiveId, taskName) {
			var prompt = $window.prompt('New task name :', taskName);
			if(prompt !== null) {
				$http.put('/objective/'+objectiveId, {name: prompt}).success(function () {
					read();
				}).error(function (error, status) {
					$scope.errorMessage = error + ' (code:' + status + ')';
				});
			}
		};

		$scope.delete = function (objectiveId) {
			$http.delete('/objective/'+objectiveId).success(function () {
				read();
			}).error(function (error, status) {
				$scope.errorMessage = error + ' (code:' + status + ')';
			});
		};

		read();

	});
