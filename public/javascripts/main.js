/*this is a branch - mauricio*/
/*Thisd is a new comment*/
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
			which : '='
		},
		restrict: 'E',
		template: [
			'<input type-in type="text" which={{field}} />'+
			'<label>Search for {{field}}</label>'+
			'<div class="dropdown">'+
				'<div ng-repeat="item in newArray">{{item.value}}</div>'+
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
				var key = "";
				var word = "";
				$scope.newArray = [];	
      			for(var i=0; i< $scope.$parent.data1.length; i++){
      				var result = "";
      				if($scope.which == 'name'){
      					result = $scope.JsonSearch( $scope.$parent.data1[i].name, elem[0].value );
      					if(result != undefined)
      						$scope.newArray.push({'value':result});
      				}
      				else{
      					result = $scope.JsonSearch( $scope.$parent.data1[i].capital, elem[0].value )
      					if(result !== undefined)
      						$scope.newArray.push({'value':result});
      				}
      				$scope.$digest();
      			}
      			
			});
		},
		controller: function($scope){
			$scope.JsonSearch = function(key, value){
				var word = "";
				for(k in key){
					word+=key[k];
					if(word.toLowerCase() == value.toLowerCase() ){
						return key;
					}					
				}
				word = "";
			}
		}
	}
});
