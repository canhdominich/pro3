angular
		.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'EmployeeTableController',
				function($timeout, $http, $scope, $window, AuthService,
						SelectService, $rootScope) {
					$scope.excelReport = function() {
						var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
						var textRange;
						var j = 0;
						tab = document.getElementById('studenttable'); // id of
						// table

						for (j = 0; j < tab.rows.length; j++) {
							tab_text = tab_text + tab.rows[j].innerHTML
									+ "</tr>";
							// tab_text=tab_text+"</tr>";
						}

						tab_text = tab_text + "</table>";
						tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");// remove
						// if u
						// want
						// links
						// in
						// your
						// table
						tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove
						// if u
						// want
						// images
						// in
						// your
						// table
						tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi,
								""); // reomves input params

						var ua = $window.navigator.userAgent;
						var msie = ua.indexOf("MSIE ");

						if (msie > 0
								|| !!navigator.userAgent
										.match(/Trident.*rv\:11\./)) // If
						// Internet
						// Explorer
						{
							txtArea1.document.open("txt/html", "replace");
							txtArea1.document.write(tab_text);
							txtArea1.document.close();
							txtArea1.focus();
							sa = txtArea1.document.execCommand("SaveAs", true,
									"Say Thanks to Sumit.xls");
						} else
							// other browser not tested on IE 11
							sa = $window.open('data:application/vnd.ms-excel,'
									+ encodeURIComponent(tab_text));

						return (sa);
					}

					$scope.minus = false;
					$scope.$on('Minus', function() {
						$scope.minus = true;
					});

					$scope.action = true;
					$scope.$on('Action', function() {
						$scope.action = true;
					});

					$scope.$on('NotAction', function() {
						$scope.action = false;
					});

					$scope.$on('classid', function() {
						$scope.classid = SelectService.getClassId();

					});

					$scope.setMinus = function(a, b, c, d) {
						var setminus = {};
						setminus.rmName = a;
						setminus.rmFrom = b;
						setminus.rmObject = c;
						setminus.rmFromId = d;
						SelectService.setMinus(setminus);
						$rootScope.$broadcast('SetMinus');

					}

					$scope.create = function() {

						// SelectService.setCreateForm(true);
						$rootScope.$broadcast('CreateStudent');
						// $scope.displayForm=true;
					}

					$scope.edit = function(std) {

						SelectService.setEdit(std);
						$rootScope.$broadcast('EditStudent');
					}

					var initStudent = function() {
						$http.get('api/student').success(function(res) {
							$scope.users = res;
							AuthService.setListStudent(res);
							// console.log("users sidebar:", AuthService
							// .getListUser());
							$rootScope.$broadcast('ListStudent');

						}).error(function(error) {
							$scope.message = error.message;
						});
					};
					$scope.$on('InitStudent', function() {
						initStudent();
					});

					$scope.$on('Message', function() {
						$scope.message = SelectService.getMessage();
						$timeout(function() {
							$scope.message = null;
						}, 2000);
					});

					$scope.deleteStudent = function(userid) {
						SelectService.setStudentId(userid);
						$rootScope.$broadcast('DeleteStudent');
					}

					$scope.selectId = function(id) {
						// event.preventDefault();
						// var ele = event.currentTarget;
						// var childs = angular.element(ele).children();
						// $scope.id = parseInt($(childs[0]).text().trim(), 10);
						SelectService.setStudentId(id);
						$rootScope.$broadcast('studentid');
						// getListRollCallOfStudent();
						// console.log("id:",$scope.id);
					}

					var getListRollCallOfStudent = function() {
						// $state.go('school.class.classinfo.students');
						var today = new Date();
						$scope.selectYear = today.getFullYear();
						$scope.monthValue = today.getMonth() + 1;
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
					$scope.theFile = null;
					// $scope.users = JSON.parse(AuthService.getListUser());
					var itemsDetails = [];
					$scope
							.$on(
									'ListEmployee',
									function() {
										$scope.classes = AuthService
												.getListEmployee();
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
												console.log("excel from student:",$scope.listUsers);
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
																'api/class/'+$scope.classid+'/student/add',
																$scope.listUsers,
																config)
														.success(
																function(res) {
																	$('#choosestd').text("Choose File");
																	console.log("after redirect:",res);
																	$scope.listUsers = null;
																	AuthService
																			.setListStudent(res.students);
																	$rootScope
																			.$broadcast('ListStudent');
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
// .directive('addStudent', [ function() {
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
