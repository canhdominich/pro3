angular
		.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'ClassFormController',
				function($http, $scope, AuthService, SelectService, $rootScope) {

					// $scope.student = {};
					//
					// var classroom = {
					// classid : "",
					//					}

					$scope.$on('CreateClass', function() {
						$scope.edit = {};
						$scope.createClass = true;
						$scope.action = "Create";

					});

					$scope.$on('EditClass', function() {
						$scope.createClass = false;
						$scope.action = "Update";
						$scope.edit = SelectService.getEdit();
						$scope.room = $scope.edit;

						// console.log("std id:",$scope.edit.id);
						// $scope.appUser.role = $scope.edit.role
					});

					var broadcastMessage = function(str) {
						SelectService.setMessage(str);
						$rootScope.$broadcast('Message');
					}

					var createClass = function() {

						$http.post('api/class/create', $scope.room)
								.success(function(res) {
									$scope.student = {};
									// $scope.confirmPassword = null;
									// // $scope.register.$setPristine();
									// // $scope.message = "Registration
									// // successfull !";
									// SelectService
									// .setCreateMessage("Create successfull
									// !");

									$('#editClassModal').modal('hide');
									// $rootScope
									// .$broadcast('CreateMessage');
									$rootScope.$broadcast('InitClass');
									broadcastMessage("Create successfull !");
								}).error(function(error) {

									// SelectService
									// .setCreateMessage(error.message);
									$('#editClassModal').modal('hide');
									// $rootScope
									// .$broadcast('CreateMessage');
									$rootScope.$broadcast('InitClass');
									broadcastMessage("Create error !");
								});
					}

					// var createStudent = function(){
					// $scope.student.user.username=$scope.student.studentname;
					// $scope.student.user.pass=$scope.student.studentname;
					// $scope.student.user.role='parent';
					// console.log("student form:",$scope.student);
					//					
					// }

					var editClass = function() {
						$http
								.put('api/class/update', $scope.room)
								.success(
										function(res) {

											

											$('#editClassModal').modal('hide');
											// $rootScope
											// .$broadcast('CreateMessage');
											$rootScope
													.$broadcast('InitClass');
											broadcastMessage("Update successfull id: "
													+ $scope.room.classid
													+ " !");
											$scope.room = {};
										})
								.error(
										function(error) {
											$scope.message = error.message;
											$('#editClassModal').modal('hide');
											$rootScope
													.$broadcast('InitClass');
											broadcastMessage("Update unsuccessfull id: "
													+ $scope.room.classid
													+ " !");

										});
					}

					$scope.submit = function() {
						if ($scope.createClass) {
							createClass();
						} else {
							editClass();
						}

					};

					$scope.theFile = null;
					$scope.listUsers = [];
					var ExcelToJSON = function() {

						this.parseExcel = function(file) {
							var reader = new FileReader();

							reader.onload = function(e) {
								var data = e.target.result;
								var workbook = XLSX.read(data, {
									type : 'binary'
								});
								var l = 1;
								workbook.SheetNames
										.forEach(function(sheetName) {
											// Here is your object
											console.log(l);
											var XL_row_object = XLSX.utils
													.sheet_to_row_object_array(workbook.Sheets[sheetName]);

											var json_object = JSON
													.stringify(XL_row_object);
											console.log("excel from class:",json_object);
											l++;
											// if
											// (JSON.parse(json_object).length >
											// 0) {
											// $scope.listUsers = JSON
											// .parse(json_object);
											// console.log($scope.listUsers);
											// var config = {
											// headers : {
											// 'Content-Type' :
											// 'application/json',
											// 'Accept' : 'application/json'
											// }
											// }

											// $http
											// .post(
											// 'api/listusers',
											// $scope.listUsers,
											// config)
											// .success(
											// function(res) {
											// $scope.listUsers = null;
											// AuthService
											// .setListUser(res);
											// $rootScope
											// .$broadcast('ListUser');
											//
											// $scope.message = "Add file
											// successfull !";
											// })
											// .error(
											// function(error) {
											// $scope.message = error.message;
											// });
											// }

										})
							};

							reader.onerror = function(ex) {
								console.log(ex);
							};

							reader.readAsBinaryString(file);
						};
					};

					$scope.handleFileSelect = function() {

						// var files = evt.target.files; // FileList object
						var xl2json = new ExcelToJSON();
						xl2json.parseExcel($scope.theFile);
					}
				}).directive('bindFile', [ function() {
			return {
				require : "ngModel",
				restrict : 'A',
				link : function($scope, el, attrs, ngModel) {
					el.bind('change', function(event) {
						ngModel.$setViewValue(event.target.files[0]);
						$scope.$apply();
						$scope.handleFileSelect();
					});

					$scope.$watch(function() {
						return ngModel.$viewValue;
					}, function(value) {
						if (!value) {
							el.val("");
						}
					});
				}
			};
		} ]);
