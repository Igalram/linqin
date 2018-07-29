function handleToken(url) {
    
    var token='';
    var x = '';
    function getSecondPart(x) {
        return x.split('=')[1];
    }

    token = getSecondPart(url);
    window.alert("rediredt:"+ token);
    localStorage.setItem("token", token);

    window.location.replace("https://igalram.github.io/linqin/#!/feed.html")
    return
}