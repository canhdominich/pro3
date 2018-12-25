angular.module('JWTDemoApp')
// Creating the Angular Controller
.controller('SchoolController',
		function($http, $scope, AuthService, $rootScope) {
			// $rootScope.$broadcast('LoginSuccessful');
			// $scope.user = AuthService.getLogUser();
			$state.go('school.user');
			var init = function() {
				$http.get('api/users').success(function(res) {
					$scope.users = res;
					AuthService.setListUser(res);
					// console.log("users
					// sidebar:",AuthService.getListUser(res));
					$rootScope.$broadcast('ListUser');

				}).error(function(error) {
					$scope.message = error.message;
				});
			};

			// init();
		});
