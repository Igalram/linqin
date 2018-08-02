// angular.module("linquinApp").directive('instagramProfile', function () {

// //     //https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN


// })   Linqin123!


app.controller('feedCtrl', function ($scope, $q, $http, $location, feedSrv) {

    //$scope.test = "testtest";
    // $scope.getFeed = function (token) {
    //     window.alert("the new token is");
    //     $scope.token = localStorage.getItem("token");
    //     window.alert($scope.token);
    // }


    // $scope.testfeedCtrl = "try try feed Ctrl"
    //console.log($scope.testfeedCtrl);
    var dbURL = "https://linqin.herokuapp.com/db";

    $scope.content = [];
    $scope.userInfo = {};
    //window.alert("getting into getFeed function with q5");

    $scope.token = localStorage.getItem("token");
    var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + $scope.token;
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

    $scope.getDB = function () {

        $http.get(dbURL).then(
            function (response) {
                console.log("getDB is called");
                console.log(response);



            },
            function (err) {
                console.log("err");
            });

    }

    $scope.DB = $scope.getDB();




    $scope.posts = [];
    $http.get(request).then(function (response) {
        response.data.data.forEach(function (plainObj) {
            var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
            $scope.posts.push(post);
        })

    }, function (error) {
        console.error(error);

    });


    $scope.checkUserExists = function (userId) {
        console.log("$scope.DB="+$scope.DB);
        console.log("userID from function: " + userId);
        console.log("users=" + $scope.DB.users);
        for (i = 0; i < $scope.DB.users.length; i++) {
            console.log("user=" + $scope.DB.users[i]);
            console.log("userId=" + $scope.DB.users[i].id);
            if (userId === $scope.DB.users[i].id)
                return true;
        }
        return false;
    }

    $scope.checkUserExists($scope.userId);

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