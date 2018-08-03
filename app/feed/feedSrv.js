app.factory('feedSrv', function ($http, $log, $q) {

    var testSrv = "do you see feedSrv service???";
    var token;

    console.log(testSrv);
    console.log("token from feedSrv=" + token);

    return {
        token: token
    }
});

