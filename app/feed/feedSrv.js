app.factory('feedSrv', function ($http, $log, $q) {

    var testSrv = "do you see feedSrv service???";
    token = localStorage.getItem("token");

    console.log(testSrv);
    console.log("token from feedSrv=" + token);

    var request = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + token;
    var dbURL = "https://linqin.herokuapp.com/db";
    var DB = {};
    var currentFeed = [];





    getDB = function () {

        $http.get(dbURL).then(
            function (response) {
                console.log("getDB is called");
                console.log(response);
                currentFeed.splice(0, currentFeed.length);
                DB = response;
                console.log(DB);
                console.log("DB.data=" + DB.data);
                console.log("response.data=" + response.data);
                checkUserExists(userId);


                DB.data.users[userIndex].data.forEach(function (plainObj) {
                    var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
                    currentFeed.push(post);
                })
                console.log("srv.currentFeed=" + currentFeed);
                updateDB(igObject, DB, userIndex);
            },
            function (err) {
                console.log("err");
            });

        return currentFeed;
    }



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



    function Post(id, userId, img, date, likes, link, location) {
        this.id = id;
        this.userId = userId;
        this.img = img;
        this.date = date;
        this.likes = likes;
        this.link = link;
        this.location = location;

    }


    posts = [];
    $http.get(request).then(function (response) {
        response.data.data.forEach(function (plainObj) {
            var post = new Post(plainObj.id, plainObj.user.id, plainObj.images.standard_resolution.url, plainObj.created_time, plainObj.likes.count, plainObj.link, plainObj.location);
            posts.push(post);
        })

    }, function (error) {
        console.error(error);

    });



    checkUserExists = function (userId) {
        userIndex = -1;
        //console.log("DB from check function= " + JSON.stringify(DB));
        console.log("userID from function: " + userId);
        console.log("users=" + DB.data.users);
        for (i = 0; i < DB.data.users.length; i++) {
            console.log("user=" + DB.data.users[i]);
            console.log("userId=" + DB.data.users[i].data[0].user.id);
            if (userId === DB.data.users[i].data[0].user.id) {
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
        for (i = IgObject.data.length; i > 0; i--) {

            for (j = ourDB.data.users[userIndex].data.length; j > 0; j--) {

                if (IgObject.data[i - 1].id == ourDB.data.users[userIndex].data[j - 1].id) {
                    offSet = (j - i);
                    return offSet;
                }

            }



        }
    }


    updateDB = function (igObject, ourDB, userIndex) {
        var offset = getOffset(igObject, ourDB, userIndex);
        if (offSet > 0) {
            newIgObject = igObject.slice(0, offSet);
            newDB = newIgObject.concat(ourDB);
            http.patch(path, newDB);
        }
    }


    return {
        token: token,
        updateDB: updateDB,
        //        getOffset: getOffset,
        getDB: getDB,
        currentFeed: currentFeed,
        addLinq: addLinq
    }

});

