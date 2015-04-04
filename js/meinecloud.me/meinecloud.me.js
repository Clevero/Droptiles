//checks if the given string end with a given string
function endsWith(string_full, suffix) {
    return string_full.indexOf(suffix, string_full.length - suffix.length) !== -1;
}//end endsWith()


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}//ende getCookie()

function askBeforeLeft(){
	swal({
        	title: 'Dasboard verlassen?',
        	text: 'Mit klick auf OK verlässt du das Dashboard und wirst auf meinecloud.me weitergeleitet!', 
        	type: 'warning',
        	html: true,
        	showCancelButton: true,
        	confirmButtonColor: '#DD6B55',    
        	confirmButtonText: 'OK, VERLASSEN!',
        	cancelButtonText: 'ABBRECHEN',
        	closeOnConfirm: false 
	}, 
		function(){
			window.location = 'http://meinecloud.me';
		}
	);
}//ende askBeforeLeft()

function printAbout(){
	sweetAlert('work in progress', 'Die Seite wird demnächst folgen und steht deshalb noch nicht zur Verfügung.', 'error');
}//ende printAbout()
