'use strict';

angular.module('okrs')
	.controller('AdminCtrl', ["$rootScope", "$scope", "$http", "$window", "OKRService", "GoogleSpreadsheetService", function($rootScope, $scope, $http, $window, okrSerivice, googleSpreadsheetService) {

    googleSpreadsheetService.something = 1;

    $rootScope.currentUser = { fullname : "Admin", email : "admin@admin.pl"};
		$rootScope.pageTitle = 'Admin | ' + $rootScope.currentUser.fullname;
		$scope.errorMessage = '';
		$scope.objectives = [];

    /**
     *
     * @param objective
     * @returns {number}
         */
    var calculateFulfilmentForObjective = function (objective) {

        var fulfillmentSum = 0.0;
        var keyResultsCount = objective.keyResults.length;

        if (keyResultsCount == 0) {
          objective.fulfillment = 0;
          return 0.0;
        }

        for (var i = 0; i < keyResultsCount; i++) {
          var keyResult = objective.keyResults[i];
          fulfillmentSum += keyResult.fulfillment;
        }

        objective.fulfillment = Math.round((fulfillmentSum / keyResultsCount) * 100);

        return objective.fulfillment;

    };


		var read = function () {
			$http.get('/objective').success(function (objectives) {
				if (objectives === '0') {
					$scope.objectives= [];
					$scope.errorMessage ='There\'s no tasks in the database. Create one if you want !';
				} else {


          for (var i = 0; i < objectives.length; i++) {
            var f = calculateFulfilmentForObjective(objectives[i]);

          }

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

		$scope.edit = function (objective) {

			if(prompt !== null) {
				$http.put('/objective/'+objective._id, objective).success(function () {
					read();
				}).error(function (error, status) {
					$scope.errorMessage = error + ' (code:' + status + ')';
				});
			}
		};

		$scope.delete = function (objective) {
			$http.delete('/objective/'+objective._id).success(function () {
				read();
			}).error(function (error, status) {
				$scope.errorMessage = error + ' (code:' + status + ')';
			});
		};

    $scope.addKeyResult = function (objective) {
      console.log(objective);
      var prompt = $window.prompt('Create a new KR for :' + objective.name, 'Key result name');
      if (prompt !== null) {
        var keyResult = {name:prompt, fulfillment:0.5};
        objective.keyResults.push(keyResult);
        $scope.edit(objective);
        $scope.recalculate(objective)
      }

    };

    $scope.removeKeyResult = function (objective, kr) {
      var okrIndex = objective.keyResults.indexOf(kr);
      objective.keyResults.splice(okrIndex,1);
      $scope.edit(objective);
      $scope.recalculate(objective)

    };

    $scope.recalculate = function(objective) {
      calculateFulfilmentForObjective(objective);
    };


		read();

	}]);
