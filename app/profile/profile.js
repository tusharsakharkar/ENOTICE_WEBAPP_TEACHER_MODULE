'use strict';

angular.module('EnoticeBoardWebApp.profile', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/profile',{
		templateUrl: 'profile/profile.html',
		controller: 'profileCtrl'
	});
}])

.controller('profileCtrl', ['$scope','CommonProp','$firebaseArray','$firebaseObject','$firebaseAuth' ,function($scope,CommonProp,$firebaseArray,$firebaseObject,$firebaseAuth){
	$scope.username = CommonProp.getUser();
  $scope.images = "http://s3.amazonaws.com/cdn.roosterteeth.com/default/tb/user_profile_male.jpg";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

      var userId = firebase.auth().currentUser.uid;
   var reff =  firebase.database().ref('/Users/' + userId).once('value').then(function(snapshot) {
  var username = snapshot.val().name;
    var ref11 = firebase.database().ref().child('posts').child('ALL').child('Approved').orderByChild("servertime").limitToFirst(3);
                $scope.notify = $firebaseArray(ref11);


 var Department = snapshot.val().department;
  var Images = snapshot.val().images;
  $scope.block = snapshot.val().block;
  console.log($scope.block);
   var Block = snapshot.val().block;
   $scope.images = Images
   $("#name1").append(username);
    $("#single-button").append(username);
    $("#depth1").append(Department);
    $("#block1").append(Block);
     

    // $("#img").append("src = " + Images);
/*$scope.name = username;
$scope.dept = Department;
$scope.images = Images;
  $scope.block = Block;*/

console.log(username);

  // ...
});


  }
});
var ref = firebase.database().ref().child('posts').child("CSE").child('Deptposts').orderByChild("approved").equalTo("pending");
$scope.articles  = $firebaseArray(ref);
$scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    }

  // ...


  }])
