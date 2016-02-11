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
		restrict: 'E',
		template: [
			'<input type-in type="text" />'+
			'<label>This is a label</label>'+
			'<div class="dropdown">'+
				'<div ng-repeat="item in data">{{item.name}}</div>'+
			'</div>'
		]
	}
});
App.directive('typeIn', function($filter){
	return{
		scope: {
			data: '='
		},
		restrict: 'A',
		link: function(scope, elem, attr){
			elem.bind('keyup', function(){
				//console.log(scope.$parent.data)
				var result = $filter('filter')(scope.$parent.data1, {name: elem[0].value });
      			scope.$parent.data = result;
      			console.log(scope)
      			console.log(scope.$parent.data);
      			//console.log(result);
      			scope.$apply();
			});
		}
	}
});