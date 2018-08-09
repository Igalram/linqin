
app.controller('feedCtrl', function ($scope, $q, $http, $location, $routeParams, feedSrv) {

  

    $scope.content = [];
    $scope.userInfo = {};
  
    $scope.addLinq = function (linq, $index) {
        feedSrv.addLinq (linq, $index)
    }
        
        
        

    $scope.token = feedSrv.token || localStorage.getItem("token");
    console.log("$scope.token in feedCtrl.js=" + $scope.token);

    $scope.currentFeed = feedSrv.currentFeed; 
    

   

    // var p1 = $http.get(request);
    // var p2 = $http.get(dbURL);


 



    // console.log("user Info:" + $scope.userInfo);


});
