angular
		.module('JWTDemoApp')
		// Creating the Angular Controller
		.controller(
				'SearchBoxController',
				function($http, $scope, AuthService, SelectService, $rootScope,
						$timeout, $q) {
					
					
					var getListClass = function() {
						$http.get('api/class').success(
								function(res) {
									// $scope.users = res;
									$scope.classroom=res
									console.log("classroom:",$scope.classroom,);

								}).error(function(error) {
							$scope.message = error.message;
						});
					};
					getListClass();
					
					$scope.setToMango = function() {
						$scope.fruit = 'mango';
					};

					$scope.reset = function() {
						$scope.state = undefined;
					};

					$scope.isCustomEnabled = true;
					$scope.custom = [ 'Item 1', 'Item 2', 'Item 3' ];
					$scope.customOptions = {
						displayText : 'This text is modifyable',
						emptyListText : 'Oops! The list is empty',
						emptySearchResultText : 'Sorry, couldn\'t find "$0"'
					};

					$scope.growable = [ 'Item 1', 'Item 2', 'Item 3' ];
					$scope.growableOptions = {
						displayText : 'Select or add a new item...',
						addText : 'Add new item',
						onAdd : function(text) {
							var newItem = 'Item ' + text;
							$scope.growable.push(newItem);
							return newItem;
						}
					};

					$scope.searchAsync = function(term) {
						// No search term: return initial items
						if (!term) {
							return [ 'Item 1', 'Item 2', 'Item 3' ];
						}
						var deferred = $q.defer();
						$timeout(function() {
							var result = [];
							for (var i = 1; i <= 3; i++) {
								result.push(term + ' ' + i);
							}
							deferred.resolve(result);
						}, 300);
						return deferred.promise;
					};

					$scope.people = [
							{
								name : 'John Doe',
								phone : '555-123-456',
								picture : 'http://www.saintsfc.co.uk/images/common/bg_player_profile_default_big.png'
							},
							{
								name : 'Axel Zarate',
								phone : '888-777-6666',
								picture : 'https://avatars0.githubusercontent.com/u/4431445?s=60'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							},
							{
								name : 'Walter White',
								phone : '303-111-2222',
								picture : 'http://upstreamideas.org/wp-content/uploads/2013/10/ww.jpg'
							} ];

					$scope.nestedItemsLevel1 = [ 'Item 1', 'Item 2', 'Item 3' ];
					$scope.level1Options = {
						onSelect : function(item) {
							var items = [];
							for (var i = 1; i <= 5; i++) {
								items.push(item + ': ' + 'Nested ' + i);
							}
							$scope.nestedItemsLevel2 = items;
						}
					};

					$scope.nestedItemsLevel2 = [];
				});