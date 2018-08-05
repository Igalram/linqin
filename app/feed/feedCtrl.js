// app.controller('linqCtrl', function($scope) {

// })
app.controller('feedCtrl', function ($scope, $q, $http, $location, $routeParams, feedSrv) {

    var dbURL = "https://linqin.herokuapp.com/db";

    $scope.content = [];
    $scope.userInfo = {};
    $scope.currentFeed = [];
    var DB = {};

    $scope.addLinq = function (linq, $index) {
        $scope.linq = linq;
        console.log("linq=" + linq);
        console.log("$index=" + $index);
        var path = "https://linqin.herokuapp.com/users/" + 2416624; //userId
        var data = getUserDataTemp();

        data['data'][$index]['link'] = 'newlink';

        $http.patch(path, data);

        //  $http({
        //     url: dbURL,
        //     method: 'PATCH',
        //     data: { "op": "replace", "path": path, "link": linq }
        // }).success(function (response) {
        //     console.log(response);
        // }).
        //     error(function (response) {
        //         console.log(response);
        //         return false;
        //     });

    }

    $scope.token = feedSrv.token || localStorage.getItem("token");
    console.log("$scope.token in feedCtrl.js=" + $scope.token);

    var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + $scope.token;



    // var p1 = $http.get(request);
    // var p2 = $http.get(dbURL);

    $scope.getDB = function () {

        $http.get(dbURL).then(
            function (response) {
                console.log("getDB is called");
                console.log(response);
                DB = response;
                console.log(DB);
                console.log("DB.data=" + DB.data);
                console.log("response.data=" + response.data);
                $scope.checkUserExists($scope.userId);

                DB.data.users[$scope.userIndex].data.forEach(function (plainObj) {
                    var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
                    $scope.currentFeed.push(post);
                })
                console.log("$scope.currentFeed=" + $scope.currentFeed);
            },
            function (err) {
                console.log("err");
            });
    }


    $scope.checkUserExists = function (userId) {
        $scope.userIndex = -1;
        console.log("DB from check function= " + JSON.stringify(DB));
        console.log("userID from function: " + userId);
        console.log("users=" + DB.data.users);
        for (i = 0; i < DB.data.users.length; i++) {
            console.log("user=" + DB.data.users[i]);
            console.log("userId=" + DB.data.users[i].data[0].user.id);
            if (userId === DB.data.users[i].data[0].user.id) {
                console.log("true");
                $scope.userIndex = i;
                return $scope.userIndex;
            }

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

        //save current feed
        // console.log("DB.data=" + DB.data);
        // console.log("response.data=" + response.data);
        // response.data.data.forEach(function (plainObj) {
        //     var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
        //     $scope.currentFeed.push(post);
        // })


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
function getUserDataTemp() {
    return {
        "id": "2416624",
        "pagination": {},
        "data": [
            {
                "id": "1810947795138648130_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/bd2e32e9a05756b6ebeedd42886df512/5BD94C35/t51.2885-15/e35/c85.0.909.909/s150x150/35928040_264762810925139_4881436915535970304_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 269,
                        "url": "https://scontent.cdninstagram.com/vp/f77719f07d6bfffd7cf0097edc22d516/5C02E778/t51.2885-15/e35/s320x320/35928040_264762810925139_4881436915535970304_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 538,
                        "url": "https://scontent.cdninstagram.com/vp/d7240cafb4eda5b344ac09c826b6a292/5BF9C52F/t51.2885-15/sh0.08/e35/s640x640/35928040_264762810925139_4881436915535970304_n.jpg"
                    }
                },
                "created_time": "1530101821",
                "caption": {
                    "id": "17935762969095229",
                    "text": "#stilllife #cinzano and #lemons, #oilpainting on wooden panel 35x30cm, #igalram #artforsale pm for quote",
                    "created_time": "1530101821",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 176
                },
                "tags": [
                    "oilpainting",
                    "artforsale",
                    "igalram",
                    "cinzano",
                    "lemons",
                    "stilllife"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 11
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Bkhx2zEBBhC/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1802991170201336040_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/74d1a653e74e44140cf29a52d0a26075/5C0D6506/t51.2885-15/e35/c202.0.676.676/s150x150/34134390_1647904765326069_3727082627019046912_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 200,
                        "url": "https://scontent.cdninstagram.com/vp/f974731d4a3b43a21ef9e584f2b4dd6c/5C091B64/t51.2885-15/e35/s320x320/34134390_1647904765326069_3727082627019046912_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 400,
                        "url": "https://scontent.cdninstagram.com/vp/6b7a7b2396ae71da310d950f1ffdef52/5C0B3599/t51.2885-15/sh0.08/e35/s640x640/34134390_1647904765326069_3727082627019046912_n.jpg"
                    }
                },
                "created_time": "1529153318",
                "caption": {
                    "id": "17891838955215291",
                    "text": "#charcoaldrawing A3, #eucalyptus and #palms, #israelart #igalram #pleinair",
                    "created_time": "1529153318",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 84
                },
                "tags": [
                    "charcoaldrawing",
                    "pleinair",
                    "igalram",
                    "eucalyptus",
                    "palms",
                    "israelart"
                ],
                "filter": "Valencia",
                "comments": {
                    "count": 1
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BkFguqpBDjo/",
                "location": {
                    "latitude": 32.833333333333,
                    "longitude": 35.583333333333,
                    "name": "Sea of Galilee",
                    "id": 234872020
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1797153421636529729_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/981af1afd81e2cb902349a77410a381f/5BF2C7B0/t51.2885-15/e35/s150x150/34565797_170607513632329_3064075612231565312_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/6af29820eae366533d55963a01c6584c/5BFC6740/t51.2885-15/e35/s320x320/34565797_170607513632329_3064075612231565312_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/38f29be82920eb0adb4c82a430b3ba04/5C0D6017/t51.2885-15/sh0.08/e35/s640x640/34565797_170607513632329_3064075612231565312_n.jpg"
                    }
                },
                "created_time": "1528457404",
                "caption": {
                    "id": "17878909417228921",
                    "text": "Aviva, #oilportrait #livemodel 40x35cm #figurativepainting 2018",
                    "created_time": "1528457404",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 91
                },
                "tags": [
                    "figurativepainting",
                    "oilportrait",
                    "livemodel"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 5
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BjwxYPnhe5B/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1795140977959455567_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/06ecdaa39c2ff8c08779983282a1e917/5C0D7B5C/t51.2885-15/e35/c120.0.840.840/s150x150/33210265_225239168063819_2777387481526435840_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 248,
                        "url": "https://scontent.cdninstagram.com/vp/c8b153c7d55431ad284e1b3825501b31/5BEDD8AE/t51.2885-15/e35/s320x320/33210265_225239168063819_2777387481526435840_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 497,
                        "url": "https://scontent.cdninstagram.com/vp/4dede30a8fa508c2d2f52da8761e508c/5BED32F9/t51.2885-15/sh0.08/e35/s640x640/33210265_225239168063819_2777387481526435840_n.jpg"
                    }
                },
                "created_time": "1528217502",
                "caption": {
                    "id": "17937069433099145",
                    "text": "#pleinairpainting #israelart #figurativepainting 40x30cm oil on canvas #igalram 2018",
                    "created_time": "1528217502",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 99
                },
                "tags": [
                    "figurativepainting",
                    "israelart",
                    "pleinairpainting",
                    "igalram"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 0
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BjpnzVZBUtP/",
                "location": {
                    "latitude": 30.6094,
                    "longitude": 34.8011,
                    "name": "Mizpe Ramon",
                    "id": 236592171
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1785569849557521123_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/56e5c8f30674283b09b3eed3ecb1822e/5C0C36A5/t51.2885-15/e35/c2.0.1076.1076/s150x150/32144988_2013483385634997_1737026864905453568_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 318,
                        "url": "https://scontent.cdninstagram.com/vp/0e5c4ee57fa186dd02a5aadc4d2f6eff/5C0119BB/t51.2885-15/e35/s320x320/32144988_2013483385634997_1737026864905453568_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 637,
                        "url": "https://scontent.cdninstagram.com/vp/d5cd3176809b23b5e7c215ec6c2c4c5d/5C034746/t51.2885-15/sh0.08/e35/s640x640/32144988_2013483385634997_1737026864905453568_n.jpg"
                    }
                },
                "created_time": "1527076534",
                "caption": {
                    "id": "17932603312125999",
                    "text": "Makhtesh Ramon, 30x20cm #oiloncanvas #hazy #sandstorm #artforsale",
                    "created_time": "1527076534",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 96
                },
                "tags": [
                    "hazy",
                    "oiloncanvas",
                    "sandstorm",
                    "artforsale"
                ],
                "filter": "Valencia",
                "comments": {
                    "count": 0
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BjHnlFchhLj/",
                "location": {
                    "latitude": 30.6094,
                    "longitude": 34.8011,
                    "name": "Mizpe Ramon",
                    "id": 236592171
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1780342103260575649_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/092c0a10007953a029ed28b2c990338c/5C071D45/t51.2885-15/e35/c176.0.727.727/s150x150/31556390_1672115759533463_5181689089832779776_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 215,
                        "url": "https://scontent.cdninstagram.com/vp/a76392331b07bc3e28d900ac27a7bf62/5C10943F/t51.2885-15/e35/s320x320/31556390_1672115759533463_5181689089832779776_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 430,
                        "url": "https://scontent.cdninstagram.com/vp/839248dd03c775e02d485282bdd322fd/5BF6DBC2/t51.2885-15/sh0.08/e35/s640x640/31556390_1672115759533463_5181689089832779776_n.jpg"
                    }
                },
                "created_time": "1526453339",
                "caption": {
                    "id": "17944398985048035",
                    "text": "#pleinair #israelart #desert 40x30cm #oilpainting on #canvas #impressionism",
                    "created_time": "1526453339",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 98
                },
                "tags": [
                    "oilpainting",
                    "pleinair",
                    "canvas",
                    "israelart",
                    "desert",
                    "impressionism"
                ],
                "filter": "Perpetua",
                "comments": {
                    "count": 0
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Bi1C7XThLeh/",
                "location": {
                    "latitude": 32.164938639193,
                    "longitude": 34.805908476812,
                    "name": "Makhtesh Ramon",
                    "id": 710558034
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1771996374653769517_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/67d9782761ca7d67eeb99e9038db3ec2/5B64C478/t51.2885-15/e15/s150x150/31157095_171653840216806_5658046287749054464_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/5176df1147f56908fcb7c9064595f35d/5B64A608/t51.2885-15/e15/s320x320/31157095_171653840216806_5658046287749054464_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/0e177ee580d86b05d8b325ec6d11c412/5B644C27/t51.2885-15/e15/s640x640/31157095_171653840216806_5658046287749054464_n.jpg"
                    }
                },
                "created_time": "1525458611",
                "caption": {
                    "id": "17843754544271103",
                    "text": "Dor, #oilportrait #painting #contemporaryart 40x40cm #kunst #arte #igalram",
                    "created_time": "1525458611",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 103
                },
                "tags": [
                    "oilportrait",
                    "arte",
                    "igalram",
                    "kunst",
                    "contemporaryart",
                    "painting"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 4
                },
                "type": "video",
                "link": "https://www.instagram.com/p/BiXZVB2hJct/",
                "location": null,
                "attribution": null,
                "users_in_photo": [],
                "videos": {
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/9fdd09940ba82b43e51059fe7207a5da/5B64EA63/t50.2886-16/31232766_463694774086704_8321418386319867904_n.mp4",
                        "id": "17870245471233017"
                    },
                    "low_bandwidth": {
                        "width": 480,
                        "height": 480,
                        "url": "https://scontent.cdninstagram.com/vp/74d11ec096bb71448f3f7e78a0cae62e/5B64C9E7/t50.2886-16/31490232_435874036836284_2231574168443289600_n.mp4",
                        "id": "17917383694136195"
                    },
                    "low_resolution": {
                        "width": 480,
                        "height": 480,
                        "url": "https://scontent.cdninstagram.com/vp/74d11ec096bb71448f3f7e78a0cae62e/5B64C9E7/t50.2886-16/31490232_435874036836284_2231574168443289600_n.mp4",
                        "id": "17917383694136195"
                    }
                }
            },
            {
                "id": "1765973078149814726_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/b577e8804631594b73e95448284caca9/5C027180/t51.2885-15/e35/c0.44.1080.1080/s150x150/30856095_1091432930997453_3559731305094578176_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 346,
                        "url": "https://scontent.cdninstagram.com/vp/7b7cb9604bb240db1d9fb3be95843d93/5BEEB9F3/t51.2885-15/e35/p320x320/30856095_1091432930997453_3559731305094578176_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 692,
                        "url": "https://scontent.cdninstagram.com/vp/09959f13c25ce756f847df15fdfb3b8d/5C0C020E/t51.2885-15/sh0.08/e35/p640x640/30856095_1091432930997453_3559731305094578176_n.jpg"
                    }
                },
                "created_time": "1524740417",
                "caption": {
                    "id": "17850875029255422",
                    "text": "#עליתהארק #israeli #anise and #orange #stilllife 40x30cm #artwork",
                    "created_time": "1524740417",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 130
                },
                "tags": [
                    "artwork",
                    "anise",
                    "עליתהארק",
                    "israeli",
                    "orange",
                    "stilllife"
                ],
                "filter": "Crema",
                "comments": {
                    "count": 2
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BiB_yh2BdnG/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1758708555172809699_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/50f3775b8580b284d63c4bee3f1225a5/5C097864/t51.2885-15/e35/s150x150/30076731_253785541831371_549966576523149312_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/c5e08205a99dbdb332765e568db6960f/5C10E269/t51.2885-15/e35/s320x320/30076731_253785541831371_549966576523149312_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/737f72b7352f151c7600072f6863295e/5BFBD985/t51.2885-15/sh0.08/e35/s640x640/30076731_253785541831371_549966576523149312_n.jpg"
                    }
                },
                "created_time": "1523874419",
                "caption": {
                    "id": "17938035934054585",
                    "text": "Jonathan, #portraitpainting #alaprima , #israelart #igalram",
                    "created_time": "1523874419",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 142
                },
                "tags": [
                    "portraitpainting",
                    "israelart",
                    "alaprima",
                    "igalram"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 5
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BhoMBzmhAvj/",
                "location": {
                    "latitude": 32.067,
                    "longitude": 34.78979,
                    "name": "סטודיו התחנה - Hatahana Studio",
                    "id": 265708278
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1755241995842187488_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/b54cf285e93b5064096673570eef972b/5C0A951D/t51.2885-15/e35/s150x150/30084762_193692661413665_3630485763105226752_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/5bfc73b07dea4a49809a163c5f50492e/5C13BFED/t51.2885-15/e35/s320x320/30084762_193692661413665_3630485763105226752_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/1cdaf6167d9185d7109862d980ad819f/5BF792BA/t51.2885-15/sh0.08/e35/s640x640/30084762_193692661413665_3630485763105226752_n.jpg"
                    }
                },
                "created_time": "1523461173",
                "caption": {
                    "id": "17907178549161826",
                    "text": "Ho ho ho, a new #glasspalette in my developing #atelier :)",
                    "created_time": "1523461173",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 116
                },
                "tags": [
                    "glasspalette",
                    "atelier"
                ],
                "filter": "Lo-fi",
                "comments": {
                    "count": 1
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Bhb30upBXDg/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1749850675070024418_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/8f9ed20f27d60d4169b1dafccad1e84e/5BFE4368/t51.2885-15/e35/s150x150/29739395_628224300851551_3847591738533216256_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/b90ab8dec1315afa171d69630ea84b9b/5BEE0598/t51.2885-15/e35/s320x320/29739395_628224300851551_3847591738533216256_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/8bf474f1b890b1a8a18509d51105cc80/5BFBF7CF/t51.2885-15/sh0.08/e35/s640x640/29739395_628224300851551_3847591738533216256_n.jpg"
                    }
                },
                "created_time": "1522818477",
                "caption": {
                    "id": "17909606428133899",
                    "text": "Anna, #portrait #study #alaprima #model #figurativeart #oiloncanvas 40x30cm",
                    "created_time": "1522818477",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 138
                },
                "tags": [
                    "figurativeart",
                    "portrait",
                    "model",
                    "study",
                    "alaprima",
                    "oiloncanvas"
                ],
                "filter": "Crema",
                "comments": {
                    "count": 3
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BhIt-r5hrri/",
                "location": {
                    "latitude": 32.0667,
                    "longitude": 34.7667,
                    "name": "Tel Aviv, Israel",
                    "id": 213041503
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1746532807557429524_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/7564a406cec8b4e61fd5973e4620ed5a/5BFB7872/t51.2885-15/e35/s150x150/29094950_164493137595544_3655547730501042176_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/967f911c3cdf7ec8934b8d5d13309b30/5BFBB482/t51.2885-15/e35/s320x320/29094950_164493137595544_3655547730501042176_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/921d1de1e39df3b8b310eb0e7c5ed20a/5BFC73D5/t51.2885-15/sh0.08/e35/s640x640/29094950_164493137595544_3655547730501042176_n.jpg"
                    }
                },
                "created_time": "1522422956",
                "caption": {
                    "id": "17933907292006390",
                    "text": "#stilllife #cactus, Happy #passover and spring holidays! #oilpainting #igalram",
                    "created_time": "1522422956",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 126
                },
                "tags": [
                    "passover",
                    "cactus",
                    "oilpainting",
                    "igalram",
                    "stilllife"
                ],
                "filter": "Mayfair",
                "comments": {
                    "count": 6
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Bg87lW_BrkU/",
                "location": {
                    "latitude": 32.0667,
                    "longitude": 34.7667,
                    "name": "Tel Aviv, Israel",
                    "id": 213041503
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1741463088341036851_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/f9b8f7e4d79f603e60d340a0b5122151/5BD93230/t51.2885-15/e35/s150x150/29087991_997924330376936_7356979494273417216_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/c5a730fdb6304549485074ef6e1c8533/5BEED4C0/t51.2885-15/e35/s320x320/29087991_997924330376936_7356979494273417216_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/d507a4b5e26ccbd79d995fb6706e43ca/5C0DDE97/t51.2885-15/sh0.08/e35/s640x640/29087991_997924330376936_7356979494273417216_n.jpg"
                    }
                },
                "created_time": "1521818599",
                "caption": {
                    "id": "17902856323165370",
                    "text": "#portrait #oil on #canvas 35x25cm  #painting #visualart #art  #artsy #arte #kunst",
                    "created_time": "1521818599",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 125
                },
                "tags": [
                    "arte",
                    "oil",
                    "art",
                    "artsy",
                    "painting",
                    "canvas",
                    "visualart",
                    "portrait",
                    "kunst"
                ],
                "filter": "Hefe",
                "comments": {
                    "count": 3
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Bgq63PCBa8z/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1739244688383572557_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/74c9e98d08c89330b18fe988e92e7ebf/5BFB81D1/t51.2885-15/e35/c0.135.1080.1080/s150x150/29088247_803440609839223_3471582500118069248_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 400,
                        "url": "https://scontent.cdninstagram.com/vp/c008575b5d6b523e028145043c666d7e/5BF83928/t51.2885-15/e35/p320x320/29088247_803440609839223_3471582500118069248_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 800,
                        "url": "https://scontent.cdninstagram.com/vp/cfb4b8b8b8e6622b796d1d83cd6cad37/5BEFF07F/t51.2885-15/sh0.08/e35/p640x640/29088247_803440609839223_3471582500118069248_n.jpg"
                    }
                },
                "created_time": "1521554145",
                "caption": {
                    "id": "17933029168009613",
                    "text": "Jacob, #portrait #oilpainting 35x25cm #alaprima",
                    "created_time": "1521554145",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 108
                },
                "tags": [
                    "portrait",
                    "alaprima",
                    "oilpainting"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 0
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BgjCdRElnpN/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1737586101617907073_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/adebc383fab3e1c25f70d8dbe0eda79c/5C08A65C/t51.2885-15/e35/c244.0.591.591/s150x150/28754359_1989774111282863_175705999682830336_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 175,
                        "url": "https://scontent.cdninstagram.com/vp/4e47dbdd706c05ba8f2439c9ecb97040/5C095FA2/t51.2885-15/e35/s320x320/28754359_1989774111282863_175705999682830336_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 350,
                        "url": "https://scontent.cdninstagram.com/vp/9208b4730358b9bb68d35f8ef0d88b19/5C033FF5/t51.2885-15/sh0.08/e35/s640x640/28754359_1989774111282863_175705999682830336_n.jpg"
                    }
                },
                "created_time": "1521356426",
                "caption": {
                    "id": "17930657635055464",
                    "text": "#waterlilies my 3rd #oilpainting ever, 2013, #shmezalel",
                    "created_time": "1521356426",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 81
                },
                "tags": [
                    "waterlilies",
                    "shmezalel",
                    "oilpainting"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 0
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BgdJVpxl1WB/",
                "location": {
                    "latitude": 32.068415049724,
                    "longitude": 34.781616670907,
                    "name": "פארק קרית ספר",
                    "id": 242076307
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1731081636873749286_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/c61aae7f7ec7078d56396a52bce88b19/5C0A96C2/t51.2885-15/e35/c0.105.1080.1080/s150x150/28432728_170676973726226_2392492058855079936_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 382,
                        "url": "https://scontent.cdninstagram.com/vp/646e661f2df8d1b15323578952cbf1ef/5C13E9C6/t51.2885-15/e35/p320x320/28432728_170676973726226_2392492058855079936_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 765,
                        "url": "https://scontent.cdninstagram.com/vp/212e7e919fdf01383a7747b4eb8bb461/5C133F91/t51.2885-15/sh0.08/e35/p640x640/28432728_170676973726226_2392492058855079936_n.jpg"
                    }
                },
                "created_time": "1520581033",
                "caption": {
                    "id": "17929237978018144",
                    "text": "#portrait of Shira, #oilpainting on primed 300gr #archespaper  30x25cm #alaprima",
                    "created_time": "1520581033",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 128
                },
                "tags": [
                    "portrait",
                    "archespaper",
                    "alaprima",
                    "oilpainting"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 1
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BgGCZO7D8Mm/",
                "location": {
                    "latitude": 32.0667,
                    "longitude": 34.7667,
                    "name": "Tel Aviv, Israel",
                    "id": 213041503
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1726312429304190263_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/5ed68b82c65aeaf7945af34bae2d5289/5C0C5CD4/t51.2885-15/e35/s150x150/28156664_2089182334650690_3405153868743442432_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/c9e96d24dd4e9fd8ea8329d77317f8d5/5BFC76AC/t51.2885-15/e35/s320x320/28156664_2089182334650690_3405153868743442432_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/632f2cf0f3bfbcc7c3248ed5dd305a66/5C085E51/t51.2885-15/sh0.08/e35/s640x640/28156664_2089182334650690_3405153868743442432_n.jpg"
                    }
                },
                "created_time": "1520012499",
                "caption": {
                    "id": "17929334950063568",
                    "text": "#nudedrawing #charcoal on #paper #sketch #livemodel 42x29cm #telaviv #studio",
                    "created_time": "1520012499",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 129
                },
                "tags": [
                    "paper",
                    "telaviv",
                    "sketch",
                    "studio",
                    "nudedrawing",
                    "livemodel",
                    "charcoal"
                ],
                "filter": "X-Pro II",
                "comments": {
                    "count": 0
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Bf1GAIQBJU3/",
                "location": {
                    "latitude": 32.0333,
                    "longitude": 34.75,
                    "name": "Jaffa, Israel",
                    "id": 215043723
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1720931387647181239_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/5a192fe59dc0c952bee7049c4a8409b7/5BF71296/t51.2885-15/e35/s150x150/28153236_153588268690314_8368044581350014976_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 320,
                        "url": "https://scontent.cdninstagram.com/vp/cbdeec71778ad4f76ef51343632f3aab/5BF01866/t51.2885-15/e35/s320x320/28153236_153588268690314_8368044581350014976_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 640,
                        "url": "https://scontent.cdninstagram.com/vp/ba2a80aa77749a944a88a41580bfde79/5BF02031/t51.2885-15/sh0.08/e35/s640x640/28153236_153588268690314_8368044581350014976_n.jpg"
                    }
                },
                "created_time": "1519371029",
                "caption": {
                    "id": "17913212002114662",
                    "text": "Ori, #portrait #alaprimera #wetonwet #oilpainting on #shellac primed #archespaper 35x25 cm #hatahanastudio #igalram",
                    "created_time": "1519371029",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 156
                },
                "tags": [
                    "alaprimera",
                    "shellac",
                    "igalram",
                    "hatahanastudio",
                    "wetonwet",
                    "oilpainting",
                    "archespaper",
                    "portrait"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 3
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Bfh-fqrh8G3/",
                "location": {
                    "latitude": 32.067,
                    "longitude": 34.78979,
                    "name": "סטודיו התחנה - Hatahana Studio",
                    "id": 265708278
                },
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1714800484721943811_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/308fe47ed3e2bdb8d9cf534c4eaefeea/5C0E36B7/t51.2885-15/e35/c0.135.1080.1080/s150x150/27576033_155735101896608_7072754016211435520_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 400,
                        "url": "https://scontent.cdninstagram.com/vp/fef2a04eb1648bc8e412720cfab10012/5C13814E/t51.2885-15/e35/p320x320/27576033_155735101896608_7072754016211435520_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 640,
                        "height": 800,
                        "url": "https://scontent.cdninstagram.com/vp/92acf6ba34a2d0af012833e4e10fb4f3/5BF4D819/t51.2885-15/sh0.08/e35/p640x640/27576033_155735101896608_7072754016211435520_n.jpg"
                    }
                },
                "created_time": "1518640169",
                "caption": {
                    "id": "17867085454200542",
                    "text": "#doodling on #ipad with #artrage #digitalart",
                    "created_time": "1518640169",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 175
                },
                "tags": [
                    "ipad",
                    "digitalart",
                    "doodling",
                    "artrage"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 4
                },
                "type": "image",
                "link": "https://www.instagram.com/p/BfMMfSYhOUD/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            },
            {
                "id": "1711028301516437141_2416624",
                "user": {
                    "id": "2416624",
                    "full_name": "Igal Ram",
                    "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                    "username": "igalram"
                },
                "images": {
                    "thumbnail": {
                        "width": 150,
                        "height": 150,
                        "url": "https://scontent.cdninstagram.com/vp/cda28be1c5b7bbe91ecb8922d30c1e8c/5C113202/t51.2885-15/e35/c47.0.363.363/s150x150/27878953_343804526136999_3150938499704684544_n.jpg"
                    },
                    "low_resolution": {
                        "width": 320,
                        "height": 253,
                        "url": "https://scontent.cdninstagram.com/vp/49dee16d37f1187530abdcfda90b606c/5C11CB98/t51.2885-15/e35/s320x320/27878953_343804526136999_3150938499704684544_n.jpg"
                    },
                    "standard_resolution": {
                        "width": 480,
                        "height": 380,
                        "url": "https://scontent.cdninstagram.com/vp/6515a1ba4bf59e75059c1055ab07f611/5BF5E02A/t51.2885-15/e35/27878953_343804526136999_3150938499704684544_n.jpg"
                    }
                },
                "created_time": "1518190489",
                "caption": {
                    "id": "17922786604035957",
                    "text": "martinos #saryan, #heat. running #dog, #tempera on cardboard, 56x68cm #armenia #yerevan",
                    "created_time": "1518190489",
                    "from": {
                        "id": "2416624",
                        "full_name": "Igal Ram",
                        "profile_picture": "https://scontent.cdninstagram.com/vp/cff42428b73503414742b94bf4061df5/5C079000/t51.2885-19/s150x150/30076791_168492463863853_6890394175884230656_n.jpg",
                        "username": "igalram"
                    }
                },
                "user_has_liked": false,
                "likes": {
                    "count": 193
                },
                "tags": [
                    "dog",
                    "heat",
                    "tempera",
                    "yerevan",
                    "saryan",
                    "armenia"
                ],
                "filter": "Normal",
                "comments": {
                    "count": 3
                },
                "type": "image",
                "link": "https://www.instagram.com/p/Be-yyzAhvaV/",
                "location": null,
                "attribution": null,
                "users_in_photo": []
            }
        ],
        "meta": {
            "code": 200
        },
        "mydata": "yaron"
    }

}