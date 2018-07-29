function handleToken(url) {
    
    var token='';
    var x = '';
    function getSecondPart(x) {
        return x.split('=')[1];
    }
    $rootScope.token = getSecondPart(url);
    window.alert("rediredt:"+ $rootScope.token);
    
    window.location.replace("https://igalram.github.io/linqin/#!/feed.html")
    return
}