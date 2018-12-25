angular
		.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'UserTableController',
				function($timeout, $http, $scope, AuthService, SelectService,
						$rootScope) {
					
					$scope.excelRoport= function ()
					{
					    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
					    var textRange; var j=0;
					    tab = document.getElementById('usertable'); // id of table

					    for(j = 0 ; j < tab.rows.length ; j++) 
					    {     
					        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
					        //tab_text=tab_text+"</tr>";
					    }

					    tab_text=tab_text+"</table>";
					    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
					    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
					    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

					    var ua = window.navigator.userAgent;
					    var msie = ua.indexOf("MSIE "); 

					    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
					    {
					        txtArea1.document.open("txt/html","replace");
					        txtArea1.document.write(tab_text);
					        txtArea1.document.close();
					        txtArea1.focus(); 
					        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
					    }  
					    else                 //other browser not tested on IE 11
					        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

					    return (sa);
					}

					$scope.create = function() {

						// SelectService.setCreateForm(true);
						$rootScope.$broadcast('CreateUser');
					}

					$scope.edit = function(user) {

						SelectService.setEdit(user);
						$rootScope.$broadcast('EditUser');
					}

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

					$scope.$on('Message',
							function() {
								$scope.message = SelectService
										.getMessage();
								$timeout(function() {
									$scope.message = null;
								}, 2000);
							});
					
					$scope.$on('CreateMessage',
							function() {
								$scope.createMessage = SelectService
										.getCreateMessage();
								$timeout(function() {
									$scope.createMessage = null;
								}, 2000);
							});

					$scope.$on('InitUser', function() {
						init();
					});

					$scope.deleteUser = function(userid) {
						SelectService.setUserid(userid);
						$rootScope.$broadcast('DeleteUser');
					}
					// $scope.theFile = null;
					// $scope.users = JSON.parse(AuthService.getListUser());
					var itemsDetails = [];
					$scope
							.$on(
									'ListUser',
									function() {
										$scope.users = AuthService
												.getListUser();
										itemsDetails = $scope.users;
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
									});

					$scope.curPage = 1;
					var itemsPerPage = 7, maxSize = 5;
					//
					// var first = (($scope.curPage - 1) * itemsPerPage), finish
					// = first
					// + itemsPerPage;
					var first = function() {
						return ($scope.curPage - 1) * itemsPerPage;
					}
					var finish = function() {

						return itemsDetails.length > (first() + itemsPerPage) ? (first() + itemsPerPage)
								: itemsDetails.length;
					}
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
					}
					$scope.previous = function(event) {
						event.preventDefault();
						$scope.curPage = $scope.curPage - 1;
						setStartEnd();
					}
					$scope.next = function(event) {
						event.preventDefault();
						$scope.curPage = $scope.curPage + 1;
						setStartEnd();
					}

				});
