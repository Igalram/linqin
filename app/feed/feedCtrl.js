app.controller('feedCtrl', function ($scope, $q, $http, $location, $routeParams, feedSrv) {

    var dbURL = "https://linqin.herokuapp.com/db";

    $scope.content = [];
    $scope.userInfo = {};
    var DB = {};


    $scope.token = feedSrv.token || localStorage.getItem("token");

    var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + $scope.token;


    // var p1 = $http.get(request);
    // var p2 = $http.get(dbURL);

    $scope.getDB = function () {

        $http.get(dbURL).then(
            function (response) {
                console.log("getDB is called");
                console.log(response);
                DB=response;
                console.log(DB);
                $scope.checkUserExists($scope.userId);

                

            },
            function (err) {
                console.log("err");
            });

    }

    $scope.checkUserExists = function (userId) {
        console.log("DB from check function= " + JSON.stringify(DB));
        console.log("userID from function: " + userId);
        console.log("users=" + DB.data.users);
        for (i = 0; i < DB.data.users.length; i++) {
            console.log("user=" + DB.data.users[i]);
            console.log("userId=" + DB.data.users[i].data[0].user.id);
            if (userId === DB.data.users[i].id){
                console.log("true");
                return true;}
            
        }
        console.log("false");
        return false;
    }



    $http.get(request).then(function (response) {
        //userInfo
        var userInfo = response.data.data[0].user;
        console.log(userInfo);
        $scope.userName = userInfo.username;
        $scope.userId = userInfo.id;
        console.log($scope.userId);
        $scope.userExists = false;

        $scope.profilePicture = userInfo.profile_picture;
        $scope.fullName = userInfo.fullName;


        console.log("username" + userInfo.username);

        $scope.content = response.data;
        console.log($scope.content);
        $scope.getDB();



    }, function (error) {
        console.error(error);
    })

    console.log("user Info:" + $scope.userInfo);



    function Post(id, userId, img, date, likes, link, location) {
        this.id = id;
        this.userId = userId;
        this.img = img;
        this.date = date;
        this.likes = likes;
        this.link = link;
        this.location = location;

    }

   
    console.log(DB);
    
    


    $scope.posts = [];
    $http.get(request).then(function (response) {
        response.data.data.forEach(function (plainObj) {
            var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
            $scope.posts.push(post);
        })

    }, function (error) {
        console.error(error);

    });


  


})




