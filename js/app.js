//Modules
var flightLite = angular.module('flightLite', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'firebase', 'inputDropdown'])
.constant('firebaseUrl', 'https://flightlite.firebaseio.com/');

flightLite.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    if(error=='AUTH_REQUIRED'){
      $rootScope.message = 'Sorry';
      $location.path('/');
    } // AUTH REQUIRED
  }); // INFO
}]); // RUN

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
    controllerAs: 'search',

    resolve: {
      currentAuth: function(Authentication) {
        return Authentication.requireAuth();
      } //current Auth
    } // resolve
  })
  .when('/flights', {
    templateUrl: 'pages/flights.html',
    controller: 'flightsController',
    controllerAs: 'flights'
  })
  .otherwise({
    redirectTo: '/'
  });
});
