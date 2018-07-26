function handleToken(url) {
    
    var token='';
    var x = '';
    function getSecondPart(x) {
        return x.split('=')[1];
    }
    token = getSecondPart(url);
    console.log(token)
    
    return
}