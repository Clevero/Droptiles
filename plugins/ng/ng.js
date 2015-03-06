//exchange old old image of the day with an newer one
function changeBackgroundImageNG() {

	//setzen des cookies, dmit wir später immernoch wissen, dass wir den background hatten

	var x = document.cookie;

	//wenn der cookie string background-image=NG-pl enthält, dann nicht wechseln
	if(!x.contains("background-image=NG-pl")){
		document.cookie = "background-image=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
		document.cookie="background-image=NG-pl";
        	var body = document.getElementsByTagName('body')[0];
        	//getTime() is important the we make every time, the functions ist execute, a individual request. otherwise the "new" image loads from the cache
        	var nextUrl = "http://meinecloud.me/droptiles-beta/plugins/ng/national-geographic-photo-of-the-day/ng_daily_image.jpg?" + new Date().getTime();
        	body.style.backgroundImage = 'url(' + nextUrl + ')';
	}//ende if
}//end changeGeographicImage()
