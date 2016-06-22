//Modules
var flightLite = angular.module('flightLite', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'firebase', 'inputDropdown']);

//Routes
flightLite.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'pages/main.htm',
    controller: 'mainController',
    controllerAs: 'main'
  })
  .when('/search', {
    templateUrl: 'pages/search.html',
    controller: 'searchController',
    controllerAs: 'search'
  })
  .when('/flights', {
    templateUrl: 'pages/flights.html',
    controller: 'flightsController',
    controllerAs: 'flights'
  })

});

//Services
flightLite.service('iataService', function($resource){
  var res = $resource('js/iataCodesUSA.json');
  return res.query();
});

flightLite.service('flightService', function($resource, $q){
  var vm = this;

  vm.in = {};

  vm.getData = function(){
    var res = $resource('http://terminal2.expedia.com/x/mflights/search?apikey=KmshkuaH90MoSVdDXnHMweROagV4lIAQ&prettyPrint=true&maxOfferCount=8');
    var resData = res.get({departureDate:vm.in.date, departureAirport:vm.in.depCode, arrivalAirport:vm.in.desCode});

    var deferred = $q.defer();
    resData.$promise.then(function(result){

      var l = result.legs.length;

      var resultArr = [];

      for(i = 0; i<l; i++){
        var obj = {};

        obj['departureCity'] = result.searchCities[0].city;
        obj['departureCityCode'] = result.searchCities[0].code;
        obj['departureCityProvince'] = result.searchCities[0].province;
        obj['destinationCity'] = result.searchCities[1].city;
        obj['destinationCityCode'] = result.searchCities[1].code;
        obj['destinationCityProvince'] = result.searchCities[1].province;
        obj['totalFare'] = result.offers[i].totalFarePrice.formattedWholePrice;

        var len = result.legs[i].segments.length;
        obj['stops'] = len - 1;
        obj['departureTime'] = result.legs[i].segments[0].departureTime;

        for(j=0; j<len; j++){
          var count = j+1;
          obj['airlineName'+count] = result.legs[i].segments[j].airlineName;
          obj['airlineNameCode'+count] = result.legs[i].segments[j].airlineCode;
          obj['departureCity'+count] = result.legs[i].segments[j].departureAirportAddress.city;
          obj['departureCityState'+count] = result.legs[i].segments[j].departureAirportAddress.state;
          obj['departureCityCode'+count] = result.legs[i].segments[j].departureAirportCode;
          obj['destinationCity'+count] = result.legs[i].segments[j].arrivalAirportAddress.city;
          obj['destinationCityState'+count] = result.legs[i].segments[j].arrivalAirportAddress.state;
          obj['destinationCityCode'+count] = result.legs[i].segments[j].arrivalAirportCode;
          obj['distance'+count] = result.legs[i].segments[j].distance +" "+ result.legs[i].segments[j].distanceUnits;
          obj['departureTime'+count] = result.legs[i].segments[j].departureTime;
          obj['destinationTime'+count] = result.legs[i].segments[j].arrivalTime;
          obj['flightNumber'+count] = result.legs[i].segments[j].flightNumber;
          obj['duration'+count] = result.legs[i].segments[j].duration;

          var layoverTime = result.legs[i].segments[j].groundTime;
          if(layoverTime){
            obj['layoverTime'+count] = layoverTime;
          }
          // else{
          //   obj['layoverTime'+count] = '';
          // }

          obj['destinationTime'] = result.legs[i].segments[j].arrivalTime;
        }

        resultArr.push(obj);
      }

      deferred.resolve(resultArr);
    }, function(err){
      console.error('Error');
    });
    return deferred.promise;
  };

  // vm.getFlightsData = null;
});


//Controllers
flightLite.controller('mainController',['$scope', '$firebaseArray', '$resource', function($scope, $firebaseArray, $resource){
  var vm = this;

  vm.userObj = {
    name: '',
    number: ''
  };


}]);

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


// flightLite.controller('mainController',['$scope', '$firebaseArray', '$resource', function($scope, $firebaseArray, $resource){
//   var vm = this;
//
//   var ref = new Firebase('https://cricbase626262.firebaseio.com/Matches');
//   vm.matches = $firebaseArray(ref);
//
//
// }]);
