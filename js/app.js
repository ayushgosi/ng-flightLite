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

});

//Services
flightLite.service('flightService', function($resource){
  var vm = this;

  //IATA json call
  vm.iata = $resource('js/iataCodesUSA.json');

  //flightsdata
  vm.flightData = $resource('http://terminal2.expedia.com/x/mflights/search?departureAirport=LAX&arrivalAirport=ORD&departureDate=2016-06-22&childTravelerAge=2&apikey=KmshkuaH90MoSVdDXnHMweROagV4lIAQ');

});


//Controllers
flightLite.controller('mainController',['$scope', '$firebaseArray', '$resource', function($scope, $firebaseArray, $resource){
  var vm = this;

  vm.userObj = {
    name: '',
    number: ''
  };


}]);

flightLite.controller('searchController',['$scope', '$timeout', '$q', '$log', '$firebaseArray', '$resource', 'flightService', function($scope, $timeout, $q, $log, $firebaseArray, $resource, flightService){
  var vm = this;

  //Date Picker
  vm.myDate = new Date();
  vm.minDate = new Date(
    vm.myDate.getFullYear(),
    vm.myDate.getMonth(),
    vm.myDate.getDate());
    vm.maxDate = new Date(
      vm.myDate.getFullYear(),
      vm.myDate.getMonth() + 2,
      vm.myDate.getDate());

      //IATA json call
      vm.iataCodes = flightService.iata.query();
      console.log(vm.iataCodes);

      //search input
      vm.dropdownObjects = vm.iataCodes;
      vm.departureObj = vm.dropdownObjects[0];
      vm.destinationObj = vm.dropdownObjects[1];

      vm.adultTravelers = null;
      vm.childTravelersAge = null;

      //flightsdata
      vm.flightData = function(){
        return flightService.flightData.get({
          departureDate: vm.myDate,
          returnDate: null,
          departureAirport: vm.departureObj.iatacode,
          arrivalAirport: vm.destinationObj.iatacode,
          prettyPrint: true,
          numberOfAdultTravelers: null,
          childTravelerAge: null,
          maxOfferCount: 10
        })
        console.log(vm.flightData);
      };
      }]);

      // flightLite.controller('mainController',['$scope', '$firebaseArray', '$resource', function($scope, $firebaseArray, $resource){
      //   var vm = this;
      //
      //   var ref = new Firebase('https://cricbase626262.firebaseio.com/Matches');
      //   vm.matches = $firebaseArray(ref);
      //
      //
      // }]);
