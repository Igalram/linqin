app.factory('feedSrv', function ($http, $log, $q) {

    var testSrv = "do you see feedSrv service???";
    token = localStorage.getItem("token");

    console.log(testSrv);
    console.log("token from feedSrv=" + token);

    var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + token;
    var dbURL = "https://linqin.herokuapp.com/db";
    var DB = {};
    var currentFeed = [];
    var userFeed = [];




    getDB = function () {

        $http.get(dbURL).then(
            function (response) {
                console.log("getDB is called");
                console.log(response);
                DB = response;
                console.log(DB);
                console.log("DB.data=" + DB.data);
                console.log("response.data=" + response.data);
                checkUserExists(userId);
                currentFeed.splice(0, currentFeed.length);



                DB.data.users[userIndex].data.forEach(function (plainObj) {
                    var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
                    currentFeed.push(post);
                })
                console.log("srv.currentFeed=" + currentFeed);
                updateDB(igObject, DB, userIndex).then(function (response) {
                    return;
                }, function (error) {
                    console.error(error);
                });

            },
            function (err) {
                console.log("err");
            });

        return currentFeed;
    }


    if (token) {
        $http.get(request).then(function (response) {
            //userInfo
            var userInfo = response.data.data[0].user;
            console.log(userInfo);
            userName = userInfo.username;
            userId = userInfo.id;
            console.log(userId);
            userExists = false;

            profilePicture = userInfo.profile_picture;
            fullName = userInfo.fullName;

            console.log("username" + userInfo.username);

            content = response.data;
            igObject = content;
            console.log(content);
            getDB();

        }, function (error) {
            console.error(error);
        })
    }


    function Post(id, userId, img, date, likes, link, location) {
        this.id = id;
        this.userId = userId;
        this.img = img;
        this.date = date;
        this.likes = likes;
        this.link = link;
        this.location = location;

    }

    if (token) {

        posts = [];
        $http.get(request).then(function (response) {
            response.data.data.forEach(function (plainObj) {
                var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
                posts.push(post);
            })

        }, function (error) {
            console.error(error);

        });
    }


    checkUserExists = function (userId) {
        userIndex = -1;
        //console.log("DB from check function= " + JSON.stringify(DB));
        console.log("userID from function: " + userId);
        console.log("users=" + DB.data.users);
        for (i = 0; i < DB.data.users.length; i++) {
            console.log("user=" + DB.data.users[i]);
            console.log("userId=" + DB.data.users[i].id);
            if (userId === DB.data.users[i].id) {
                console.log("true");
                userIndex = i;
                return userIndex;
            }

        }
        console.log("false");
        return false;
    }


    //get linq
    function addLinq(linq, $index) {
        console.log("linq=" + linq);
        console.log("$index=" + $index);
        var path = "https://linqin.herokuapp.com/users/" + userId; //userId
        var data = DB.data.users[userIndex];
        data['data'][$index]['link'] = linq;

        $http.patch(path, data).then(function (response) {
            getDB();
        }, function (error) { console.error(error); }

        )
    }


    //new functions for updating DB after IG get and compare

    function getOffset(IgObject, ourDB, userIndex) {
        for (i = IgObject.data.length - 1; i > 0; i--) {

            for (j = ourDB.data.users[userIndex].data.length - 1; j > 0; j--) {

                if (IgObject.data[i].id == ourDB.data.users[userIndex].data[j].id) {
                    offSet = (i - j);
                    return offSet;
                }

            }



        }
    }


    updateDB = function (igObject, ourDB, userIndex) {
        var async = $q.defer();
        var path = "https://linqin.herokuapp.com/users/" + userId; //userId
        var offset = getOffset(igObject, ourDB, userIndex);
        if (offSet > 0) {
            newIgObject = igObject.data.slice(0, offSet);
            var newDB = newIgObject.concat(ourDB.data.users[userIndex].data);
            ourDB.data.users[userIndex].data = newDB;
            $http.patch(path, ourDB.data.users[userIndex]).then(function (response) {
                console.log("Hi! sync");
                async.resolve(currentFeed);
            },
                function (error) {
                    console.error(error);
                    async.reject("faild to patch");
                })
        }

        currentFeed.splice(0, currentFeed.length);
        DB.data.users[userIndex].data.forEach(function (plainObj) {
            var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
            currentFeed.push(post);
        })
        return async.promise;

    }

    function VPost(image, link) {
        this.image = image;
        this.link = link;
    }



    getDbByName = function (username) {

        userFeed.splice(0, userFeed.length);
        
        $http.get(dbURL).then(
            function (response) {
                var viewerDB = response;

                for (i = 0; i < viewerDB.data.users.length; i++) {
                    if (username === viewerDB.data.users[i].data[0].user.username) {
                        viewerDB.data.users[i].data.forEach(function (obj) {
                            var vPost = new VPost(obj.images.standard_resolution.url, obj.link);
                            userFeed.push(vPost);
                        })
                    }
                }



            },
            function (err) {
                console.log("err");
            });

    }






    return {
        token: token,
        updateDB: updateDB,
        //        getOffset: getOffset,
        getDB: getDB,
        currentFeed: currentFeed,
        userFeed : userFeed,
        addLinq: addLinq
    }





});

