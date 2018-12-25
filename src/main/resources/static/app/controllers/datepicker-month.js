angular
		.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'DatepickerMonthController',
				function($http, $scope, AuthService, SelectService, $rootScope) {
					$scope.months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May',
							'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
					var loop = 0;
					$scope.range = function(min, max) {

						var input = [];
						for (var i = min; i <= max; i += 1) {
							input.push(i);
						}
						return input;
					};
					var today = new Date();
					$scope.selectYear = today.getFullYear();
					// SelectService.setYear($scope.selectYear);
					// $rootScope.$broadcast('year');

					$scope.monthValue = today.getMonth() + 1;
					// SelectService.setMonth( $scope.monthValue);
					// $rootScope.$broadcast('month');

					$scope.selectMonth = $scope.months[today.getMonth()];
					$scope.changeView = function() {
						if (loop % 2 == 0) {
							$("#month").css({
								"display" : " none"
							});
							$("#year").css({
								"display" : " flex"
							});
							var ele = $(event.currentTarget).children('span');
							$(ele[1]).css({
								"display" : "inline"
							});

							$(ele[0]).css({
								"display" : "none"
							});
							loop++;
						}

					}

					$scope.chooseYear = function(event) {
						var ele = event.currentTarget
						$scope.selectYear = parseInt($(ele).text().trim(), 10);
						SelectService.setYear($scope.selectYear);
						$("#month").css({
							"display" : " flex"
						});
						$("#year").css({
							"display" : " none"
						});
						var ele = $('.monthPicker-top-current')
								.children('span');
						$(ele[1]).css({
							"display" : "none"
						})

						$(ele[0]).css({
							"display" : "inline"
						})
						loop++;
						$rootScope.$broadcast('year');
					}

					$scope.chooseMonth = function(event) {
						var ele = event.currentTarget
						$scope.selectMonth = $(ele).text().trim();
						$scope.monthValue = $scope.months
								.indexOf($scope.selectMonth) + 1;
						SelectService.setMonth($scope.monthValue);
						console.log("month:", $scope.monthValue);
						$rootScope.$broadcast('month');

					}
					$scope.clickleft = function() {
						$scope.selectYear = $scope.selectYear - 1;
					}
					$scope.clickright = function() {
						$scope.selectYear = $scope.selectYear + 1;
					}
				});
