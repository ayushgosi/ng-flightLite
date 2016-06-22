flightLite.controller('searchController',['$scope', 'iataService', 'flightService', function($scope, iataService, flightService){
  var vm = this;

  //IATA json call
  vm.iataData = iataService;
  console.log(vm.iataData);

  //Date Picker
  vm.myDate = new Date();
  vm.minDate = new Date(vm.myDate.getFullYear(), vm.myDate.getMonth(), vm.myDate.getDate());
  vm.maxDate = new Date(vm.myDate.getFullYear(), vm.myDate.getMonth() + 2, vm.myDate.getDate());
  //inputDate
  vm.month = vm.myDate.getMonth()+1;
  vm.selectedDate = vm.myDate.getFullYear() + "-" + vm.month + "-" + vm.myDate.getDate();
  console.log(vm.selectedDate);

  //search input
  vm.departureObj = null;
  vm.destinationObj = null;

  vm.sendInputDetails = function(){
    console.info("Inside sendInputDetails");
    flightService.in = {
      date: vm.selectedDate,
      depCode: vm.departureObj.iatacode,
      desCode: vm.destinationObj.iatacode
    };
  };
}]);
