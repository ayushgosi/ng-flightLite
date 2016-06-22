flightLite.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'firebaseUrl',
 function($rootScope, $firebaseAuth, $firebaseObject, $location, firebaseUrl) {

 var ref = new Firebase(firebaseUrl);
 var auth = $firebaseAuth(ref);

 auth.$onAuth(function(authUser){
   if(authUser) {
     var userRef = new Firebase(firebaseUrl + 'users/' + authUser.uid);
     var userObj = $firebaseObject(userRef);
     // console.log(userObj);
     $rootScope.currentUser = userObj;
   } else {
     $rootScope.currentUser = '';
   }
 });

 var myObject = {
   login: function(user) {
     auth.$authWithPassword({
       email: user.loginEmail,
       password: user.loginPassword
     }).then(function(regUser){
       $location.path('/search');
     }).catch(function(error){
       $rootScope.message = error.message;
     });
   }, //login

   logout: function() {
     return auth.$unauth();
   }, // logout

   requireAuth: function(){
     return auth.$requireAuth();
   }, // require authentication

   register: function(user) {
     auth.$createUser({
       email: user.registerEmail,
       password: user.registerPassword
     }).then(function(regUser) {

       var regRef = new Firebase(firebaseUrl + 'users')
       .child(regUser.uid).set({
         date: Firebase.ServerValue.TIMESTAMP,
         regUser: regUser.uid,
         fullname: user.registerFullname,
         username: user.registerUsername,
         email: user.registerEmail
       }); // user info

       myObject.login(user);
     }).catch(function(error) {
       $rootScope.message = error.message;
     }); // //createUser
   } // register
 };
 return myObject;
}]); //factory
