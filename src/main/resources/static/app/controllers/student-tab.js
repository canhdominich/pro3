angular.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'StudentTabController',
				function($http, $scope, $state, AuthService, SelectService,
						$rootScope) {
					// $state.go('school.class.classinfo.students');
					// $scope.studentid = SelectService.getStudentId();
					
					$scope.getMark= function(){
						
						$rootScope.$broadcast('InitMark');
					}
					$scope.$on('studentid', function() {
						var today = new Date();
						$scope.selectYear = today.getFullYear();
						$scope.monthValue = today.getMonth() + 1;
						$scope.studentid = SelectService.getStudentId();
						getListRollCallOfStudent();
					});
					
					$scope.$on('month', function() {
						$scope.monthValue = SelectService.getMonth();
						getListRollCallOfStudent();
					});
					$scope.$on('year', function() {
						$scope.selectYear = SelectService.getYear();
						getListRollCallOfStudent();
					});
					var getListRollCallOfStudent = function() {
						
						$http.get(
								'api/student/'
										+ SelectService.getStudentId($scope.id)
										+ "/" + $scope.selectYear + "-"
										+ $scope.monthValue).success(
								function(res) {
									// console.log("rollcall of:",res)
									SelectService.setListRollcall(res)
									$rootScope.$broadcast('ListRollCall');
								}).error(function(error) {
							$scope.mes = error.message;
						});
					};
					// getListRollCallOfStudent();
				});
