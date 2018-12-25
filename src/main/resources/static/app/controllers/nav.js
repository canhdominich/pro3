angular.module('JWTDemoApp')
// Creating the Angular Controller
.controller('NavController',
		function($http, $scope, AuthService, $state, $rootScope) {
			$scope.user = AuthService.getLogUser();
			// $scope.$on('LoginSuccessful', function () {
			// $scope.user = AuthService.getLogUser();
			// console.log("login success:",$scope.user);
			// });
			$scope.$on('LogoutSuccessful', function() {
				$scope.user = null;
			});

			$scope.$on('SelectTable', function() {
				$scope.table = AuthService.getSelectedTable();

			});
			$scope.logout = function() {
				AuthService.user = null;
				$rootScope.$broadcast('LogoutSuccessful');
				$state.go('login');
			};
			$scope.table = "user";
			$scope.checkIfEnterKeyWasPressed = function($event) {

				var keyCode = $event.which || $event.keyCode;
				if (keyCode === 13) {
					$http({
						url : 'api/search',
						method : "GET",
						params : {
							table : $scope.table,
							q : $scope.q
						}
					}).success(function(res) {

						if ($scope.table == 'user') {
							AuthService.setListUser(res);
							$rootScope.$broadcast('ListUser');
						} else if ($scope.table == 'student') {
							AuthService.setListStudent(res);
							$rootScope.$broadcast('ListStudent');
						}

					}).error(function(error) {

					});

				}

			};
		});
