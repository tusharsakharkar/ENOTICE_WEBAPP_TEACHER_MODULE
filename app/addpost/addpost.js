'use strict';
angular.module('EnoticeBoardWebApp.addpost', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addpost', {
        templateUrl: 'addpost/addpost.html'
        , controller: 'addpostCtrl'
    });
}]).controller('addpostCtrl', ['$scope', '$timeout', 'CommonProp', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($scope, $timeout, CommonProp, $firebaseArray, $firebaseObject, $firebaseAuth) {
    $scope.loading = false;
    var ref;
    var downloadURL;
    var Department;
    var Name;
    var profileImg;
    var userId
    var useremail;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    console.log(today);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            useremail = firebase.auth().currentUser.email;
            var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                Name = snapshot.val().name;
                name = snapshot.val().name;
                $scope.block = snapshot.val().block;
                profileImg = snapshot.val().images;
                $scope.name = Name;
                ref = firebase.database().ref().child('posts').child(Department).child('Pending');
                $scope.articles = $firebaseArray(ref);
            });
        }
    });
    $scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    }
    $scope.createPost = function () {
        $scope.loading = true;
        var d = new Date();
        var n = d.getTime();
        var a = parseInt(-1 * n);
        var title = $scope.articles.titletxt;
        var post = $scope.articles.posttxt;
        var ntype = $scope.articles.ntype;
        console.log(useremail);
        $scope.articles.$add({

            title: title
            , Desc: post
            , UID: userId
            , approved: "pending"
            , time: today
            , username: Name
            , link: "http://www.freeiconspng.com/uploads/document-extension-file-file-format-filename-text-txt-icon--20.png"
            , images: "http://www.freeiconspng.com/uploads/document-extension-file-file-format-filename-text-txt-icon--20.png"
            , type: 1
            , department: Department
            , label: ntype
            , email: useremail
            , servertime: a
            , profileImg: profileImg
        }).then(function (ref) {
            $timeout(function () {
                console.log("fasla");
                $scope.loading = false;
                
                $('#deleteModal').modal('toggle');
                $('#deleteModal').modal('show');
            }, 3000);
            //$("#postmatter").show();
            document.getElementById('postmatter').innerHTML = 'Success';
            console.log(ref);
        }, function (error) {
            $scope.loading = false;
            $('#deleteModal').modal('toggle');
            $('#deleteModal').modal('show');
            document.getElementById('postmatter').innerHTML = 'All field are mandatory!Please check if all the fields are filled';
            console.log(error);
        });
    };
    }]);
angular.module('MyApp').controller('AppCtrl', function ($scope) {
    $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
});