app.controller('feedCtrl', function ($scope, $q, $http, $location, feedSrv) {

    var dbURL = "https://linqin.herokuapp.com/db";

    $scope.content = [];
    $scope.userInfo = {};
    var DB = {};


    $scope.token = localStorage.getItem("token");

    var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + $scope.token;


    // var p1 = $http.get(request);
    // var p2 = $http.get(dbURL);

    $scope.getDB = function () {

        $http.get(dbURL).then(
            function (response) {
                console.log("getDB is called");
                console.log(response);
                DB=response;
                $scope.checkUserExists($scope.userId);

                

            },
            function (err) {
                console.log("err");
            });

    }

    $scope.checkUserExists = function (userId) {
        console.log("DB from check function= " + DB);
        console.log("userID from function: " + userId);
        console.log("users=" + DB.users);
        for (i = 0; i < DB.users.length; i++) {
            console.log("user=" + DB.users[i]);
            console.log("userId=" + DB.users[i].id);
            if (userId === DB.users[i].id)
                return true;
        }
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









//console.log("$scope.content: " + $scope.content);




// $scope.getFeed = function (token) {

//     $scope.token = localStorage.getItem("token");
//     window.alert($scope.token);
//     var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + $scope.token;
//     var async = $q.defer();
//     $http.get(request).then(function (response) {
//         //$scope.content = response.data;

//         //userInfo
//         var userInfo = response.data.data[0].user;
//         console.log("username" + userInfo.full_name);


//         async.resolve(request);
//     }, function (error) {
//         console.error(error);
//         async.reject("Failed to get feed");
//     })

//     console.log("user Info:" + $scope.userInfo);
//     //console.log("$scope.content: " + $scope.content);
//     return async.promise;
// }

// return {
//     restrict: "E",
//     //controllerAs: "instagramFeed",
//     //templateUrl: "instagramTemplate",
//     transclude: true,
//     controller: function ($scope, $http) {

//         var instagramFeed = this;
//         instagramFeed.content = [];

//         $http({
//             url: 'https://api.instagram.com/v1/users/self/media/recent',
//             params: {
//                 access_token: instagram_key
//             }
//         }).then(function (response) {
//             console.log(response);

//             //userInfo
//             var userInfo = response.data.data[0].user;
//             instagramFeed.full_name = userInfo.full_name;
//             instagramFeed.username = userInfo.username;
//             instagramFeed.profile_picture = userInfo.profile_picture;

//             //user Images
//             angular.forEach(response.data.data, function (Object, key) {
//                 instagramFeed.content[key] = {};
//                 instagramFeed.content[key].imageUrl = object.images.standard_resolution.url;
//                 instagramFeed.content[key].instagramLink = object.link;
//             })
//         })
//     }