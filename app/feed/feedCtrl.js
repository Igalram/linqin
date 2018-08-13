
app.controller('feedCtrl', function ($scope, $q, $http, $location, $routeParams, feedSrv) {



    $scope.content = [];
    $scope.currentFeed = [];
    $scope.userInfo = {};
    

    $scope.addLinq = function (linq, $index) {
        feedSrv.addLinq(linq, $index)
    }
    

    $scope.token = feedSrv.token || localStorage.getItem("token");
    console.log("$scope.token in feedCtrl.js=" + $scope.token);
    
    feedSrv.getAllInfo().then(function (data) {
        console.log(data);
        $scope.currentFeed = data.feed;
        $scope.userInfo = data.user;
    });

   
    $scope.profilePicture = '';
    $scope.userName = '';
    $scope.fullName = '';



    // var p1 = $http.get(request);
    // var p2 = $http.get(dbURL);






    // console.log("user Info:" + $scope.userInfo);


});
