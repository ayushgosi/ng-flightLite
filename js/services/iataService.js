flightLite.service('iataService', function($resource){
  var res = $resource('js/iataCodesUSA.json');
  return res.query();
});
