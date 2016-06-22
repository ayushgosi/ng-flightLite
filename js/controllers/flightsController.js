flightLite.controller('flightsController',['$scope', 'iataService', 'flightService', function($scope, iataService, flightService){
  var vm = this;

  var data = flightService.getData();
  data.then(function(resData){
    vm.flightsData = resData;
    console.log(vm.flightsData);
  }, function(err){
    console.error("error!");
  });

}]);
