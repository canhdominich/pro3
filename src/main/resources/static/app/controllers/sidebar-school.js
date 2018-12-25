angular.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'SidebarSchoolController',
				function($state, $http, $scope, $rootScope, AuthService) {
					$state.go('school.user');

					var edit = false;
					$scope.buttonText = 'Create';
					var init = function() {
						$http.get('api/users').success(function(res) {
							$scope.users = res;
							AuthService.setListUser(res);
							// console.log("users sidebar:", AuthService
							// .getListUser());
							$rootScope.$broadcast('ListUser');

						}).error(function(error) {
							$scope.message = error.message;
						});
					};
					init();

					var getListClass = function() {
						$http.get('api/class').success(
								function(res) {
									// $scope.users = res;
									AuthService.setListClass(res);
									console.log("classes sidebar:", AuthService
											.getListClass());
									$rootScope.$broadcast('ListClass');

								}).error(function(error) {
							$scope.message = error.message;
						});
					};

					var getListStudent = function() {
						$http.get('api/student').success(
								function(res) {
									// $scope.users = res;
									AuthService.setListStudent(res);
									console.log("student sidebar:", AuthService
											.getListStudent());
									$rootScope.$broadcast('ListStudent');

								}).error(function(error) {
							$scope.message = error.message;
						});
					};

					var getListTeacher = function() {
						$http.get('api/teacher').success(
								function(res) {
									// $scope.users = res;
									AuthService.setListTeacher(res);
									console.log("teacher sidebar:", AuthService
											.getListTeacher());
									$rootScope.$broadcast('ListTeacher');

								}).error(function(error) {
							$scope.message = error.message;
						});
					};
					
					var getListEmployee = function() {
						$http.get('api/employee').success(
								function(res) {
									// $scope.users = res;
									AuthService.setListEmployee(res);
									console.log("employee sidebar:", AuthService
											.getListEmployee());
									$rootScope.$broadcast('ListEmployee');

								}).error(function(error) {
							$scope.message = error.message;
						});
					};
					$scope.chooseTable = function(event) {
						var ele = event.currentTarget;
						console.log(angular.element(ele).text().trim(),
								" :is selected");
						// AuthService.setSelectedTable(angular.element(ele)
						// .text().trim());

						if (angular.element(ele).text().trim().localeCompare(
								"Class") == 0) {
							AuthService.setSelectedTable("class")
							getListClass();

						} else if (angular.element(ele).text().trim()
								.localeCompare("Student") == 0) {
							AuthService.setSelectedTable("student")
							getListStudent();
							$rootScope.$broadcast('Action');
						} else if (angular.element(ele).text().trim()
								.localeCompare("User") == 0) {
							AuthService.setSelectedTable("user")
							init();
						} else if (angular.element(ele).text().trim()
								.localeCompare("Teacher") == 0) {
							AuthService.setSelectedTable("teacher")
							getListTeacher();
							$rootScope.$broadcast('Action');
						} else if (angular.element(ele).text().trim()
								.localeCompare("Employee") == 0) {
							AuthService.setSelectedTable("employee")
							getListEmployee();
							$rootScope.$broadcast('Action');
						}
						$rootScope.$broadcast('SelectTable');
					}

				});
