angular
		.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'ClassTableController',
				function($timeout,$http, $scope, $state, AuthService, SelectService,
						$rootScope) {

					$scope.deleteClass = function(classid) {
						SelectService.setClassId(classid);
						$rootScope.$broadcast('DeleteClass');
					}
					
					$scope.create = function() {
						$rootScope.$broadcast('CreateClass');
					}

					$scope.edit = function(std) {
						SelectService.setEdit(std);
						$rootScope.$broadcast('EditClass');
					}

					$scope.selectId = function(x) {
						$scope.classSelected=x;

						SelectService.setClassId(x.classid);
						$rootScope.$broadcast('classid');
						$rootScope.$broadcast('Minus');
						$rootScope.$broadcast('NotAction');
					}

					var initStudent = function() {
						$http.get('api/class').success(function(res) {
						
							AuthService.setListClass(res);
							// console.log("users sidebar:", AuthService
							// .getListUser());
							$rootScope.$broadcast('ListClass');

						}).error(function(error) {
							$scope.message = error.message;
						});
					};
					$scope.$on('InitClass', function() {
						initStudent();
					});

					
					$scope.$on('Message',
							function() {
								$scope.message = SelectService
										.getMessage();
								$timeout(function() {
									$scope.message = null;
								}, 2000);
							});
					
					$scope.theFile = null;
					// $scope.users = JSON.parse(AuthService.getListUser());
					var itemsDetails = [];
					$scope
							.$on(
									'ListClass',
									function() {
										$scope.classes = AuthService
												.getListClass();
										itemsDetails = $scope.classes;
										// console.log("users on listuser:",
										// itemsDetails);
										// console.log("page on listuser:",
										// $scope.numOfPages());
										$scope.numOfPages = Math
												.ceil(itemsDetails.length
														/ itemsPerPage);
										$scope.start = 1;
										$scope.end = maxSize > $scope.numOfPages ? $scope.numOfPages
												: maxSize;
										// first = (($scope.curPage - 1) *
										// itemsPerPage),
										// finish = itemsDetails.length > (first
										// + itemsPerPage) ? (first +
										// itemsPerPage)
										// : itemsDetails.length;
									});

					$scope.curPage = 1;
					var itemsPerPage = 7, maxSize = 5;
					var first = function() {
						return ($scope.curPage - 1) * itemsPerPage;
					}
					var finish = function() {

						return itemsDetails.length > (first() + itemsPerPage) ? (first() + itemsPerPage)
								: itemsDetails.length;
					}
					// var first = (($scope.curPage - 1) * itemsPerPage), finish
					// = first
					// + itemsPerPage;
					$scope.filteredItems = function(curPage) {
						return itemsDetails.slice(first(), finish());
					}

					$scope.range = function(min, max) {
						// console.log("min:", min)
						// console.log("max:", max)
						var input = [];
						for (var i = min; i <= max; i += 1) {
							input.push(i);
						}
						return input;
					};

					var setStartEnd = function() {
						if ($scope.numOfPages >= maxSize) {
							if ($scope.curPage > $scope.numOfPages
									- Math.floor(maxSize / 2)) {
								$scope.start = $scope.numOfPages - maxSize + 1;
								$scope.end = $scope.numOfPages;
							} else if ($scope.curPage <= Math
									.floor(maxSize / 2)) {
								$scope.start = 1;
								$scope.end = maxSize;
							} else {
								$scope.start = $scope.curPage
										- Math.floor(maxSize / 2);
								$scope.end = $scope.curPage
										+ Math.floor(maxSize / 2);
							}

						}
					}

					$scope.setCurPage = function(event) {
						event.preventDefault();
						var ele = event.currentTarget;
						$scope.curPage = parseInt(angular.element(ele).text(),
								10);

						// console.log($scope.curPage);
						setStartEnd();
						// first = (($scope.curPage - 1) * itemsPerPage);
						// finish = itemsDetails.length > (first + itemsPerPage)
						// ? (first + itemsPerPage)
						// : itemsDetails.length;
						// $scope.filteredItems = itemsDetails
						// .slice(first, finish);
					}
					$scope.previous = function(event) {
						event.preventDefault();
						$scope.curPage = $scope.curPage - 1;
						setStartEnd();
						// first = (($scope.curPage - 1) * itemsPerPage);
						// finish = itemsDetails.length > (first + itemsPerPage)
						// ? (first + itemsPerPage)
						// : itemsDetails.length;
						// $scope.filteredItems = itemsDetails
						// .slice(first, finish);
					}
					$scope.next = function(event) {
						event.preventDefault();
						$scope.curPage = $scope.curPage + 1;
						setStartEnd();
						// first = (($scope.curPage - 1) * itemsPerPage);
						// finish = itemsDetails.length > (first + itemsPerPage)
						// ? (first + itemsPerPage)
						// : itemsDetails.length;
						// $scope.filteredItems = itemsDetails
						// .slice(first, finish);
					}

					$scope.submit = function() {
						console.log("create user")
						$http
								.post('api/users', $scope.appUser)
								.success(
										function(res) {
											$scope.appUser = null;
											$scope.confirmPassword = null;
											// $scope.register.$setPristine();
											$scope.message = "Registration successfull !";
										}).error(function(error) {
									$scope.message = error.message;
								});
					};

					$scope.listUsers = [];
					$scope.result = {};
					var ExcelToJSON = function() {

						this.parseExcel = function(file) {
							var reader = new FileReader();

							reader.onload = function(e) {
								var data = e.target.result;
								var workbook = XLSX.read(data, {
									type : 'binary'
								});
								workbook.SheetNames
										.forEach(function(sheetName) {
											// Here is your object
											var XL_row_object = XLSX.utils
													.sheet_to_row_object_array(workbook.Sheets[sheetName]);

											var json_object = JSON
													.stringify(XL_row_object);
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
												// console.log("create list
												// user:", $scope.listUsers);
												// console.log("length",
												// $scope.listUsers.length);
												$http
														.post(
																'api/listusers',
																$scope.listUsers,
																config)
														.success(
																function(res) {
																	$scope.listUsers = null;
																	AuthService
																			.setListUser(res);
																	$rootScope
																			.$broadcast('ListUser');
																	// console.log("create
																	// list user
																	// success:",
																	// $scope.listUsers);
																	// $scope.register.$setPristine();
																	$scope.message = "Add file successfull !";
																})
														.error(
																function(error) {
																	$scope.message = error.message;
																});
											}
											// console.log("xl
											// object:",json_object);
											// $scope.listUsers.push(JSON.parse(json_object));
											// console
											// .log(JSON.parse(json_object).length);

										})
							};
							// reader.onload = function(e) {
							// var data = e.target.result;
							// data = new Uint8Array(data);
							// var workbook = XLSX.read(data, {
							// type : 'array'
							// });
							// // console.log(workbook);
							// var result = {};
							// workbook.SheetNames
							// .forEach(function(sheetName) {
							// var roa = XLSX.utils.sheet_to_json(
							// workbook.Sheets[sheetName],
							// {
							// header : 1
							// });
							// if (roa.length)
							// result[sheetName] = roa;
							// });
							// // see the result, caution: it works after
							// // reader event is done.
							// console.log(result);
							// };
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
						// var config = {
						// headers : {
						// 'Content-Type' : 'application/json',
						// 'Accept' : 'application/json'
						// }
						// }
						// // console.log("create list user:",
						// $scope.listUsers);
						// // console.log("length", $scope.listUsers.length);
						// $http
						// .post('api/listusers', $scope.listUsers, config)
						// .success(
						// function(res) {
						// $scope.listUsers = null;
						// // console.log("create list user
						// // success:",
						// // $scope.listUsers);
						// // $scope.register.$setPristine();
						// $scope.message = "Registration successfull !";
						// }).error(function(error) {
						// $scope.message = error.message;
						// });
						// xl2json.parseExcel(files[0]);
					}
				})
// .directive('bindFile', [ function() {
// return {
// require : "ngModel",
// restrict : 'A',
// link : function($scope, el, attrs, ngModel) {
// el.bind('change', function(event) {
// ngModel.$setViewValue(event.target.files[0]);
// $scope.$apply();
// $scope.handleFileSelect();
// });
//
// $scope.$watch(function() {
// return ngModel.$viewValue;
// }, function(value) {
// if (!value) {
// el.val("");
// }
// });
// }
// };
// } ])
;

