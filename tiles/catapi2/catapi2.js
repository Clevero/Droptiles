//exchange old cat image with a newer one from the api
function changeCatImage() {
        var body = document.getElementsByTagName('body')[0];
	//getTime() is important the we make every time, the functions ist execute, a individual request. otherwise the "new" image loads from the cache
        var nextUrl = "http://thecatapi.com/api/images/get?format=src&category=caturday&size=small&" + new Date().getTime();
        body.style.backgroundImage = 'url(' + nextUrl + ')';
}//end changecatImage()
