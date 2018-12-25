angular.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'ClassTabController',
				function($http, $scope, $state, AuthService, SelectService,
						$rootScope) {
					// $state.go('school.class.classinfo.students');

					$scope.$on('classid', function() {
						$scope.classid = SelectService.getClassId();
						getListStudentOfClass();
					});
					var getListStudentOfClass = function() {
						// $state.go('school.class.classinfo.students');
						$http.get('api/class/' + $scope.classid+'/student').success(
								function(res) {
									console.log("std of class:",res.students)
									AuthService.setListStudent(res.students);
									$rootScope.$broadcast('ListStudent');
								}).error(function(error) {
							$scope.mes = error.message;
						});
					};
					// getListStudentOfClass();
				});
