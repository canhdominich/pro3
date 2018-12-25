angular.module('JWTDemoApp')
// Creating the Angular Controller
.controller('ConfirmController', function($http, $scope, AuthService,SelectService,$rootScope) {
	
	$scope
	.$on(
			'DeleteUser',
			function() {
				$scope.table="user";
				$scope.id=SelectService.getUserid();
			});
	
	$scope
	.$on(
			'DeleteStudent',
			function() {
				$scope.table="student";
				$scope.id=SelectService.getStudentId();
			});
	
	$scope
	.$on(
			'DeleteClass',
			function() {
				$scope.table="classroom";
				$scope.id=SelectService.getClassId();
			});
	
	$scope.deletion = function () {
		
        $http.delete('api/delete/'+$scope.table+'/' + $scope.id).success(function (res) {
            $scope.deleteMessage = "Success!";
            SelectService.setMessage( $scope.deleteMessage);
            $rootScope.$broadcast('Message');
            if ($scope.table.localeCompare("student") == 0) {
            	 $rootScope.$broadcast('InitStudent');
			}else if($scope.table.localeCompare("user") == 0){
				$rootScope.$broadcast('InitUser');
			}else if($scope.table.localeCompare("classroom") == 0){
				$rootScope.$broadcast('InitClass');
			}
           
           $('#confirm-delete').modal('hide');
        }).error(function (error) {
            $scope.deleteMessage = "Delete not success !";
            SelectService.setMessage( $scope.deleteMessage);
            $rootScope.$broadcast('Message');
            if ($scope.table.localeCompare("student") == 0) {
           	 $rootScope.$broadcast('InitStudent');
			}else if($scope.table.localeCompare("user") == 0){
				$rootScope.$broadcast('InitUser');
			}
            $('#confirm-delete').modal('hide');
        });
    };
});
