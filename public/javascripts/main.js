/**/
var App = angular.module('app', []);
App.controller('thisApp', function($scope, $http){
	$http.get('https://restcountries.eu/rest/v1/all')
	.success(function(mydata){
		$scope.data = mydata;
		$scope.data1 = mydata;
	})
	.error(function(error){
		console.log(error);
	});
});
App.directive('inputText', function(){
	return {
		scope: { 
			which : '@',
		},
		restrict: 'E',
		template: [
			'<input type-in type="text" which={{field}} />'+
			'<label>Search for {{field}}</label>'+
			'<div class="dropdown">'+
				'<div ng-repeat="item in data">{{item.name}}</div>'+
			'</div>'
		],
		link: function(scope, elem, attr){
			scope.field = attr['type'];
		}
	}
});
App.directive('typeIn', function($filter){
	return{
		restrict: 'A',
		link: function($scope, elem, attr){
			elem.bind('keyup', function(){
				$scope.which = attr['which'];
				console.log($scope.which);
								//var result = $scope.searchJson( scope.$parent.data1, scope.which );
				//var result = $filter('filter')(scope.$parent.data1, { name : elem[0].value });
      			//scope.$parent.data = result;
      			//scope.$apply();
      			
			});
		},
		controller: function($scope){
			$scope.searchJson = function(data, key){
				console.log(key)
			}
		}
	}
});
