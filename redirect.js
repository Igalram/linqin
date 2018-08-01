function handleToken(url) {
    
    var token='';
    var x = '';
    function getSecondPart(x) {
        return x.split('=')[1];
    }

    token = getSecondPart(url);
    //window.alert("rediredt:"+ token);
    localStorage.setItem("token", token);

    window.location.replace("http://localhost:5500/#!/feed.html")
    return
}