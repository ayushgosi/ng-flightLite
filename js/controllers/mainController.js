flightLite.controller('mainController',['$scope', 'Authentication', function($scope, Authentication){
  var vm = this;

  // vm.user = {};

  vm.login = function() {
    Authentication.login(vm.user);
  }; //login

  vm.logout = function() {
    Authentication.logout();
  }; //logout

  vm.register = function() {
    console.log("in register function()");
    Authentication.register(vm.user);
    console.log("in register function()");
  }; // register

}]);
