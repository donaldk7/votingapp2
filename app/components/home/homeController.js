app.controller("homeCtrl", ['$scope', 'dataService',
 function($scope, dataService) {
  dataService.getAll().then(function(response) {
   $scope.results = response.data;
  });
  
  $scope.removePoll =function(topic, index) {
   $scope.results.splice(index, 1);
   dataService.delete(topic);
  };
  
 }
]);







// $http({
// 	method: "GET",
// 	url: "someUrl",
// 	params: {
// 		key1: "value1",
// 		key2: "value2"
// 	}
// });

