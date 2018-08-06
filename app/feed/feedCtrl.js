
app.controller('feedCtrl', function ($scope, $q, $http, $location, $routeParams, feedSrv) {

  

    $scope.content = [];
    $scope.userInfo = {};
  
    $scope.addLinq = function (linq, $index) {
        $scope.linq = linq;
        console.log("linq=" + linq);
        console.log("$index=" + $index);
        var path = "https://linqin.herokuapp.com/users/" + $scope.userId; //userId
        //var data = getUserDataTemp();
        var data = DB.data.users[$scope.userIndex];
        data['data'][$index]['link'] = linq;

        $http.patch(path, data);

    }

    $scope.token = feedSrv.token || localStorage.getItem("token");
    console.log("$scope.token in feedCtrl.js=" + $scope.token);

    $scope.currentFeed = feedSrv.currentFeed; 

   

    // var p1 = $http.get(request);
    // var p2 = $http.get(dbURL);


 



    // console.log("user Info:" + $scope.userInfo);


});
