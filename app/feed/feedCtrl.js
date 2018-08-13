
app.controller('feedCtrl', function ($scope, $timeout, $q, $http, $location, $routeParams, feedSrv) {



    $scope.content = [];
    $scope.userInfo = {};
    

    $scope.addLinq = function (linq, $index) {
        feedSrv.addLinq(linq, $index)
    }
    

    $scope.token = feedSrv.token || localStorage.getItem("token");
    console.log("$scope.token in feedCtrl.js=" + $scope.token);

    
    $timeout(function(){
        $scope.currentFeed = feedSrv.currentFeed;
        $scope.profilePicture = feedSrv.profilePicture();
        $scope.userName = feedSrv.userName();
        $scope.fullName = feedSrv.fullName();
    },1000)
    $scope.profilePicture = '';
    $scope.userName = '';
    $scope.fullName = '';



    // var p1 = $http.get(request);
    // var p2 = $http.get(dbURL);






    // console.log("user Info:" + $scope.userInfo);


});
