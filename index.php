<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="description" content="Droptiles - Metro style Live Tile enabled Web 2.0 Dashboard" />
    <meta name="author" content="Omar AL Zabir" />
    <meta name="copyright" content="2012, Omar AL Zabir" />
    <meta name="license" content="Free for personal use. For commercial use, contact me for License. http://oazabir.github.com/Droptiles/" />
    <meta name="apple-mobile-web-app-capable" content="yes" /> 
    
    <title>meineCloud.me - Dashboard</title>

    <link rel="icon" href="/droptiles/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/droptiles.css?v=14">
    <link rel="stylesheet" type="text/css" href="js/sweetalert/lib/sweet-alert.css">
    <link rel="stylesheet" type="text/css" href="js/alertify.js/src/css/core.css" />
    <link rel="stylesheet" type="text/css" href="js/alertify.js/src/css/themes/default/default.css" />

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    	<script src="js/html5.js"></script> <!-- from http://html5shim.googlecode.com/svn/trunk/html5.js -->
    <![endif]-->

    <script src="plugins/ng/ng.js"></script>
    <script src="js/meinecloud.me/meinecloud.me.js"></script>
    <script src="js/alertify.js/src/js/alertify.js"></script>
    <script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.2.custom.min.js"></script>
    <script type="text/javascript" src="js/jQueryEnhancement.js"></script>
    <script type="text/javascript" src="js/jQuery.MouseWheel.js"></script>
    <script type="text/javascript" src="js/jquery.kinetic.js"></script>
    <script type="text/javascript" src="js/Knockout-2.1.0.js"></script>
    <script type="text/javascript" src="js/knockout.sortable.js"></script>
    <script type="text/javascript" src="js/cookie.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/Underscore.js"></script>
    <script type="text/javascript" src="js/jQuery.hashchange.js"></script>
    <script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
    <script src="js/sweetalert/lib/sweet-alert.min.js"></script>
    <script type="text/javascript" src="js/User.js"></script> 
    <script type="text/javascript" src="js/TheCore.js?v=14"></script>
    <script type="text/javascript" src="tiles/tiles.js?v=14"></script>
    <script type="text/javascript" src="js/Dashboard.js?v=14"></script>
    <script type="text/javascript">
    	// Bootstrap initialization
    	$(document).ready(function () {
        	$('.dropdown-toggle').dropdown();
    	});
    </script>
    <script type="text/javascript">
    	window.currentUser = new User({
        	firstName: "None",
        	lastName: "Anonymous",
        	photo: "img/User No-Frame.png",
        	isAnonymous: true
    	});
    </script>
    <script type="text/javascript">
        window.profileData = null;
        	$(document).ready(function(){
            });
    </script>

</head>
<body> 
    <div id="body" class="unselectable">
        <div id="navbar" class="navbar navbar-fixed-top navbar-inverse">
            <div class="navbar-inner">
                <div class="container">                    
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active">                                
                                <a class="brand" style="cursor:pointer" onclick="askBeforeLeft()"><img src="/droptiles/img/cloud_24px.png" style="max-height: 24px; margin-top: -2px; margin-right:5px; vertical-align: middle" />meineCloud.me</a>
                            </li>
                            <li>
				<a class="active" href="/droptiles"><img src="/droptiles/img/dashboard_24px.png"></img> Dashboard</a>
			    </li>

                            <li>
                                <form id="googleForm" class="navbar-search pull-left" action="http://duckduckgo.com/" target="_blank">
                                    <input id="googleSearchText" type="text" class="search-query span2" name="q" placeholder="DuckDuckGo">
                                </form>
                            </li>
                        </ul>
                        <ul class="nav pull-right">
                            

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-white icon-tint"></i>Themes<b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#" onclick="swal({
        title: 'GrünerApfel Creative Commons',
        text: 'Wähle eines seiner Fotos als Hintergrund aus.<br><br><br>', 
        html: true,
        showCancelButton: false,
});">CreativeCommons</a></li>
                                    <li><a href="#" onclick="ui.switchTheme('theme-moos', true)">Moos</a></li>
                                    <li><a href="#" onclick="ui.switchTheme('theme-white', true)">White</a></li>
				    <li><a href="#" onclick="ui.switchTheme('theme-Forest', true)">Forest</a></li>
				    <li><a href="#" onclick="ui.switchTheme('theme-Flower', true)">Flower</a></li>
					<li><a href="http://akk.li/pics/anne.jpg">#Caturday</a></li>
				    <li><a href="#" onclick="ui.switchTheme('theme-NASA-pl', true)"><img src="/droptiles/img/nasa_32x26px.png"></img></a></li>
				    <li><a href="#" onclick="ui.switchTheme('theme-NG-pl', true)"><img src="/droptiles-beta/img/national_geographic_64x19px.png"></img></a></li>
                                </ul>
                            </li>

				<li>
           			<a class="active" style="cursor:pointer" onclick="printAbout()"><img src="/droptiles/img/info_26px.png" width="24" height="24"></img> About</a>
                            </li>
                            

                        </ul>
                    </div>
                </div>	<!-- Ende container-->
            </div>
        </div>

        <div id="content" style="visibility: hidden">
            <div id="start" data-bind="text: title"></div>

            <div id="browser_incompatible" class="alert">
                <button class="close" data-dismiss="alert">Ã—</button>
                <strong>Warning!</strong>
		Dein Browser unterstützt anscheinend das Dashboard nicht. Bitte nutze Firefox, Chrome, Safari oder IE 9+
            </div>
            <div id="CombinedScriptAlert" class="alert">
                <button class="close" data-dismiss="alert">Ã—</button>
                <strong>Warning!</strong>
                Combined javascript files are outdated. 
                Please retun the js\Combine.bat file. 
                Otherwise it won't work when you will deploy on a server.
            </div>
            <div id="metro-sections-container" class="metro">
                <div class="metro-sections" data-bind="foreach: sections">
                    
                    <div class="metro-section" data-bind="sortable: { data: tiles }">
                        <div data-bind="attr: { id: uniqueId, 'class': tileClasses }">
                            <a class="metro-tile-link">                        
                                <!-- ko if: tileImage -->
                                <div class="tile-image">
                                    <img data-bind="attr: { src: tileImage }" src="img/Internet%20Explorer.png" />
                                </div>
                                <!-- /ko -->
                                <!-- ko if: iconSrc -->
                                <!-- ko if: slides().length == 0 -->
                                <div data-bind="attr: { 'class': iconClasses }">
                                    <img data-bind="attr: { src: iconSrc }" src="img/Internet%20Explorer.png" />
                                </div>
                                <!-- /ko -->
                                <!-- /ko -->
                                <div data-bind="foreach: slides">
                                    <div class="tile-content-main">
                                        <div data-bind="html: $data">
                                        </div>
                                    </div>
                                </div>
                                <!-- ko if: label -->
                                <span class="tile-label" data-bind="html: label">Label</span>
                                <!-- /ko -->
                                <!-- ko if: counter -->
                                <span class="tile-counter" data-bind="html: counter">10</span>
                                <!-- /ko -->
                                <!-- ko if: subContent -->
                                <div data-bind="attr: { 'class': subContentClasses }, html: subContent">
                                    subContent
                                </div>
                                <!-- /ko -->
                            </a>
                        </div>   
                        
                    </div>
                </div>
            </div>
        </div>
        <div id="copyright">            
            Copyright 2012 <a href="http://omaralzabir.com/">Omar AL Zabir</a>. This is Open Source. 
            For license details and to get the code, <a href="http://oazabir.github.com/Droptiles/">See Droptiles GitHub</a>
        </div>
    </div>

</body>

    <!-- Copyright 2012 Omar AL Zabir -->
    <!-- <script type="text/javascript" src="https://www.google.com/jsapi"></script> -->
</html>
