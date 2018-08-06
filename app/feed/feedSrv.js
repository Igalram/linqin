app.factory('feedSrv', function ($http, $log, $q) {

    var testSrv = "do you see feedSrv service???";
    var token;

    console.log(testSrv);
    console.log("token from feedSrv=" + token);

    function getOffset(IgObject, ourDB, userIndex) {
        for (i=IgObject.data.data.length; i=0; i--) {

            for (j=ourDB.data.users[userIndex].data.length; j=0; j--) {

                if (IgObject.data.data.id==ourDB.data.users[userIndex].data.id) {
                    offSet=(j-i);
                    return offSet;

                }

            }



        }


    }


    function updateDB (IgObject, ourDB, offSet) {
        
        newIgObject = IgObject.slice(0,offSet);
        newDB = newIgObject.concat(ourDB);
        http.patch (path, newDB);


    }


    return {
        token: token,
        updateDB : updateDB,
        getOffset : getOffset
    }
});

