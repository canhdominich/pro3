angular.module('JWTDemoApp')
// Creating the Angular Controller
.controller(
		'ConfirmMinusController',
		function($http, $scope, AuthService, SelectService, $rootScope) {

			$scope.$on('SetMinus', function() {
				$scope.setminus = SelectService.getMinus();

			});

			$scope.minus = function(e) {

				$http.put(
						'api/' + $scope.setminus.rmFrom + '/'
								+ $scope.setminus.rmFromId + '/'
								+ $scope.setminus.rmName + '/minus',
						$scope.setminus.rmObject).success(function(res) {
					if ($scope.setminus.rmName == 'student') {
						AuthService.setListStudent(res.students);
						$rootScope.$broadcast('ListStudent');
					}
					$('#confirm-minus').modal('hide');

				}).error(function(error) {
					$scope.message = error.message;
					if ($scope.setminus.rmName == 'student') {
						AuthService.setListStudent(res.students);
						$rootScope.$broadcast('ListStudent');
					}
					$('#confirm-minus').modal('hide');
				});

			}

		});
