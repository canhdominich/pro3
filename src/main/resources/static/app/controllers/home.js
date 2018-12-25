angular.module('JWTDemoApp')
// Creating the Angular Controller
.controller('HomeController', function($http, $scope, AuthService,$rootScope) {
	$rootScope.$broadcast('LoginSuccessful');
	$scope.user = AuthService.user;
});
