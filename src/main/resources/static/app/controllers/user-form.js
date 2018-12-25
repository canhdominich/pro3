angular
		.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'UserFormController',
				function($http, $scope, AuthService, SelectService, $rootScope) {

					$scope.appUser = {};

					$scope.$on('CreateUser', function() {
						$scope.createUser = true;
						$scope.action = "Create";
						$scope.edit = null;

					});

					$scope.$on('EditUser', function() {

						$scope.createUser = false;
						$scope.action = "Update";
						$scope.edit = SelectService.getEdit();
						console.log("edit:", $scope.edit);
						$scope.appUser.id = $scope.edit.id
						$scope.appUser.role = $scope.edit.role
					});

					var createUser = function() {
						$http
								.post('api/user/create', $scope.appUser)
								.success(
										function(res) {
											$scope.appUser = null;
											$scope.confirmPassword = null;
											// $scope.register.$setPristine();
											// $scope.message = "Registration
											// successfull !";
											SelectService
													.setCreateMessage("Create successfull !");
											$('#editModal').modal('hide');
											$rootScope
													.$broadcast('CreateMessage');
											$rootScope.$broadcast('InitUser');
										})
								.error(
										function(error) {

											SelectService
													.setCreateMessage(error.message);
											$('#editModal').modal('hide');
											$rootScope
													.$broadcast('CreateMessage');
											$rootScope.$broadcast('InitUser');
										});
					}

					var editUser = function() {
						$http
								.put('api/user/update', $scope.appUser)
								.success(
										function(res) {
											SelectService
													.setCreateMessage("Update successfull row "
															+ $scope.appUser.id
															+ " !");
											$scope.appUser = {};
											$scope.confirmPassword = null;

											$('#editModal').modal('hide');
											$rootScope
													.$broadcast('CreateMessage');
											$rootScope.$broadcast('InitUser');
										}).error(function(error) {
									$scope.message = error.message;

								});
					}

					$scope.submit = function() {
						if ($scope.createUser) {
							createUser();
						} else {
							editUser();
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
											console.log("excel from user:",
													json_object);
											l++;
											if (JSON.parse(json_object).length > 0) {
												$scope.listUsers = JSON
														.parse(json_object);
												console.log($scope.listUsers);
												var config = {
													headers : {
														'Content-Type' : 'application/json',
														'Accept' : 'application/json'
													}
												}

												$http
														.post(
																'api/listusers',
																$scope.listUsers,
																config)
														.success(
																function(res) {
																	$(
																			'#choosestd')
																			.text(
																					"Choose File");
																	$scope.listUsers = null;
																	AuthService
																			.setListUser(res);
																	$rootScope
																			.$broadcast('ListUser');

																	$scope.message = "Add file successfull !";
																})
														.error(
																function(error) {
																	$(
																			'#choosestd')
																			.text(
																					"Choose File");
																	$scope.message = error.message;
																});
											}

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
				}).directive('addUser', [ function() {
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
