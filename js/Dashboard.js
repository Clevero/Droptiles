﻿/// <reference path="jquery-1.7.2.min.js" />
/// <reference path="TheCore.js" />
/// <reference path="Underscore.js" />
/* ======================================
    Droptiles - Dashboard javascript
    Copyright 2012, Omar AL Zabir

    Builds the Dashboad experience. It offers the Drag & Drop feature,
    clicking on a tile to launch a full screen app, showing Settings, Login etc
    modules, sliding through tile slides etc. 

======================================*/


// Configuration of UI elements for the Dashboard and all the UI behaviors including
// drag & drop, clicking on tile, launch app, in tile behavior etc. Basically all jQuery
// stuff.
var ui = {
    subcontent_height: 50,
    metro_sections_selector: '.metro-sections',
    metro_section_selector: '.metro-section',
    metro_section: 'metro-section',
    hover_metro_section: 'hover-metro-section',
    metro_section_overflow: 'metro-section-overflow',
    app_iframe_id: 'app_iframe',
    app_iframe_zindex: 60000,
    navbar: '#navbar',
    navbar_zindex: '60001',
    tile: 'tile',
    tile_content_main_selector: '.tile-content-main',
    tile_selector: '.tile',
    tile_color: 'bg-color-blue',
    tile_icon_size: 'tile-icon-large',
    tile_icon_src: 'img/update.png',
    tile_subContent_color: 'bg-color-blueDark',
    tile_multi_content_selector: '.tile-multi-content',
    tile_multi_content: 'tile-multi-content',
    tile_content_slide_delay: 5000,
    tile_content_sub_selector: '.tile-content-sub',
    tile_content_sub: 'tile-content-sub',
    position_cookie: 'tiles',
    splash_screen_zindex: 65000,
    splash_screen_icon_class: 'tile-icon-large',
    signin_splash_color: 'bg-color-green',
    signin_splash_icon: 'img/User No-Frame.png',
    settings_splash_color: 'bg-color-purple',
    settings_splash_icon: 'img/configure.png',
    appStore_splash_color: 'bg-color-blue',
    appStore_splash_icon: 'img/App Store.png',
    anon_first_name: 'John',
    anon_last_name: 'Anonymous',
    anon_photo: 'img/User No-Frame.png',


    appRunning: false,
    currentApp: "",

    /*
        Go through all the sections and tiles and hook the dynamic
        behavior to the tiles.
    */
    attachTiles: function () {
        ko.utils.arrayForEach(viewModel.sections(), function (section) {
            ko.utils.arrayForEach(section.tiles(), function (tile) {
                tile.init($('#' + tile.uniqueId));
                ui.attach(tile);
            });
        });
    },

	loadBackground: function () {
		//add content
		//wenn uns "" zurückgeliefert wird, dann ist das cookie nicht gesetzt. wir setzen also den default
		if(getCookie("background-image") != ""){
        		ui.switchTheme( getCookie("background-image"), false);
        		//alert("Cookie war schon gesetzt");
        		//alert(getCookie("background-image"));
		}//ende if
		else{
        		ui.switchTheme('theme-moos', false);
			alertify.log("Customize your Droptiles by selecting your favorite Theme!");
		}//ende elese
    },

	printCreativeCommons: function(){

        swal({
                title: 'Creative Commons',
                text: 'Von welchem Künstler soll welches Bild als Hintergrundbild ausgewählt werden? <br><br><br><p>GrünerApfel</b><select onchange="ui.switchTheme(\'theme-\' + this.value)"><option value="Moos">Moos</option><option value="Forest">Forest</option><option value="Flower">Flower</option></select>',
                html: true,
                showCancelButton: false,
                }
        );

    },


    /*
        Attach the Tile DIV to a single Tile object and provide all the UI behaviors
        like click, mouse over etc.
    */
    attach: function (tile) {
        var el = $('#' + tile.uniqueId);
        el.unbind("mouseenter mouseleave click");

        el.mouseenter(function () {
            el = $(this);
            if (el.hasClass(ui.tile_multi_content_selector)) {
                var c_sub = $(ui.tile_content_sub, el);
                c_sub.animate({ "height": ui.subcontent_height, "opacity": 1 }, 200);
            }
        }).mouseleave(function () {
            el = $(this);
            if (el.hasClass(ui.tile_multi_content_selector)) {
                var c_sub = $(ui.tile_content_sub_selector, el);
                c_sub.animate({ "height": 0, "opacity": 0 }, 200);
            }
        });
        
        //el.find("a.metro-tile-link").click(function (event) {
        //    $(this).parent().click();
        //});
        // On click, launch the app either inside dashboard or in a new browser tab
        //el.find("a.metro-tile-link").click(function (event) {
        el.click(function(event) {
            // Drag & drop just happened. Prevent incorrect click event.
            if ($(this).parent().data("noclick") == true)
                return;

            // If the item clicked on the tile is a link or inside a link, don't
            // lauch app. Let browser do the hyperlink click behavior.
            /*if (event.target.tagName == "A" ||
                !$(event.target).closest("a").hasClass("metro-tile-link"))
                return;*/

            if (!_.isEmpty(tile.appUrl)) {

                // Open app in new browser window. Not all websites like IFRAMEing.
                if (tile.appInNewWindow) {
                    var open_link = window.open('', '_blank');
                    open_link.location = tile.appUrl;
                }
                else {
                    // Make the tile div explode into full screen

                    ui.hideAllIframes();

                    var clone = $("<div/>")
                        .addClass(tile.tileClasses())
                        .css({
                            'position': 'absolute',
                            'left': el.offset().left,
                            'top': el.offset().top,
                            'width': el.width() + "px",
                            'height': el.height() + "px",
                            'z-index': ui.splash_screen_zindex
                        })
                        .appendTo(document.body)
                        .animate({
                            left: $(window).scrollLeft(),
                            top: $(window).scrollTop(),
                            width: "100%",
                            height: "100%"
                        }, 500, function () {
                            // Launch the full screen app inside an IFRAME. ViewModel has
                            // this feature.
                            ui.launchApp(tile.name, tile.appTitle, tile.appUrl, function () {
                                clone.fadeOut();
                                ui.restoreAllIframes();
                            });
                        })
                        .append(
                            $('<img />')
                                .attr('src', tile.appIcon)
                                .addClass(tile.iconClasses())
                                .css({
                                    'position': 'absolute',
                                    'left': ($(window).width() - 512) / 2,
                                    'top': ($(window).height() - 512) / 2
                                })
                        );

                }
            }
        });        
    },

    /*
        Hide all sections and tiles.
    */
    hideMetroSections: function () {
        $(ui.metro_sections_selector).hide();
    },
    
    /*
        Transition sections and tiles into view
    */
    showMetroSections: function (callback) {

        $(ui.metro_sections_selector)
            .css({
                'margin-left': 50,
                'margin-top': 20,
                'opacity': 0
            })
            .show()
            .animate({
                'margin-left': 0,
                'opacity': 1
            }, 500, 'swing', callback);
    },

    /*
        Hide all iframe on the screen so that fullscreen DIVs can appear
        without having IFRAMEs peeking through them.
    */
    hideAllIframes: function(){
        $("iframe:visible")
                .hide()
                .data("hidden_during_launch", true);                
                    
    },

    /*
        Restore visibility of the iframes that were hidden by calling hideAllIFrame
    */
    restoreAllIframes: function () {
        $("iframe:hidden").each(function (index, iframe) {
            if ($(iframe).data("hidden_during_launch") == true) {
                $(iframe)
                    .show()
                    .data("hidden_during_launch", false);
            }
        });
    },

    /*
        Launch a full screen app. It creates a full screen IFRAME to host the appUrl.
    */
    launchApp: function (id, title, url, loaded) {

        ui.hideMetroSections();
        
        ui.appRunning = true;
        ui.currentApp = url;

        var iframe = $('<iframe id="' + ui.app_iframe_id + '" frameborder="no" />')
           .css({
               'position': 'absolute',
               'left': "0",
               'top': "0px",
               'width': '100%',
               'height': '100%',
               'z-index': ui.app_iframe_zindex, /* könnte relevant sein */
               'visibility': 'hidden',
               'background-color': 'white'
           })
           .appendTo(document.body)
           .attr({ 'src': url })
           .load(function () {
               /* ui.hideNavBar(); */
               loaded();
               $(this).css('visibility', 'visible');
           });


        location.hash = id;
    },

    /*
        Closes the fullscreen app.
    */
    closeApp: function () {
        $('#' + ui.app_iframe_id).remove();
        ui.showNavBar();

        this.appRunning = false;
        this.currentApp = "";

        ui.showMetroSections(function () { });

        location.hash = "";
    },

    /*
        Hide the top nav bar and keep a small part visible so that when user hovers
        or clicks on that part, the whole nav bar appears.
    */
    hideNavBar: function () {
        var navbar = $(ui.navbar);
        navbar
            .css("z-index", ui.navbar_zindex)
            .delay(3000)
            .animate({
                top: -(navbar.height() - 5) + "px"
            }, function () {
                $('#navbar').tooltip('show');
                _.delay(function () {
                    $('#navbar').tooltip('hide');
                }, 10000);
            }).bind("mouseenter click", function () {
                navbar
                    .stop(true, true)
                    .animate({
                        top: "0px"
                    });
            }).bind("mouseleave", function () {
                navbar
                    .stop(true, true)
                    .delay(3000)
                    .animate({
                        top: -(navbar.height() - 5) + "px"
                    });
            });
    },

    showNavBar: function () {
        var navbar = $(ui.navbar);
        navbar
            .unbind("mouseenter mouseleave")
            .animate({
                top: "0px"
            });
    },

    fullscreenAppClosed: function () {
        ui.showMetroSections(function () { });
    },

    /*
        Tiles can have multiple slides in them. This will run a timer to slide
        through the slides.
    */
    animateTiles: function () {
        //ui.animateTilesOneAfterAnother();
        ui.animateTilesAllAtOnce();
    },

    animateTilesOneAfterAnother: function () {
        window.clearInterval(ui.timerId);
        window.lastTileIndex = 0;
        ui.timerId = window.setInterval(function () {
            var tilesWithSlides = $(ui.tile_selector).has(ui.tile_content_main_selector);
            if (window.lastTileIndex == tilesWithSlides.length)
                window.lastTileIndex = 0;

            if (tilesWithSlides.length > window.lastTileIndex) {
                var el = $(tilesWithSlides[window.lastTileIndex]);
                window.lastTileIndex++;
                var slides = $(ui.tile_content_main_selector, el);
                if (slides.length > 0) {
                    var slideIndex = el.data("slideIndex") || 1;
                    if (slideIndex == slides.length) {
                        slideIndex = 0;
                    }
                    var firstPage = slides.first();
                    firstPage.animate({ marginTop: -(slideIndex * firstPage.height()) }, 500);
                    el.data("slideIndex", ++slideIndex);
                }
            }
        }, ui.tile_content_slide_delay);
    },

    animateTilesAllAtOnce: function () {
        window.clearInterval(ui.timerId);
        window.lastTileIndex = 0;
        ui.timerId = window.setInterval(function () {
            $(ui.tile_selector).each(function (index, tile) {
                var el = $(tile);
                var slides = $(ui.tile_content_main_selector, el);
                if (slides.length > 0) {
                    var slideIndex = el.data("slideIndex") || 1;
                    if (slideIndex == slides.length) {
                        slideIndex = 0;
                    }
                    var firstPage = slides.first();
                    firstPage.animate({ marginTop: -(slideIndex * firstPage.height()) }, 500);
                    el.data("slideIndex", ++slideIndex);
                }
            });
        }, ui.tile_content_slide_delay);
    },

    /*
        When a tile is dragged & dropped, take the tile DIV position and use that
        to calculate the index of tile objects in the viewModel. A special case is when
        a tile is moved from a section to another. In that case, remove the tile from
        the originating section and add it on the dropped section.
    */
    //recalcIndex: function () {
    //    $(ui.metro_section_selector).each(function (sectionIndex, sectionDiv) {
    //        var section = viewModel.getSection(sectionDiv.id);
    //        $(ui.tile_selector, sectionDiv).each(function (index, tileDiv) {
    //            var tileId = tileDiv.id;
    //            var tileObject = section.getTile(tileId);
    //            if (tileObject != null) {
    //                if (tileObject.index() != index) {
    //                    console.log(tileId + ":" + tileObject.index() + "->" + index);
    //                    tileObject.index(index);
    //                }
    //            }
    //            else {
    //                var tileFromSomewhere;
    //                var containingSection = ko.utils.arrayFirst(viewModel.sections(), function (s) {
    //                    tileFromSomewhere = ko.utils.arrayFirst(s.tiles(), function (t) {
    //                        return t.uniqueId == tileId;
    //                    });
    //                    return tileFromSomewhere != null;
    //                });
    //                if (containingSection != null) {
    //                    console.log(containingSection.uniqueId()+":remove:" + tileFromSomewhere.uniqueId);
    //                    containingSection.tiles.remove(tileFromSomewhere);
    //                    if (tileFromSomewhere != null) {
    //                        console.log(tileFromSomewhere.uniqueId + ":" + tileFromSomewhere.index() + "->" + index);
    //                        tileFromSomewhere.index(index);
    //                        console.log(containingSection.uniqueId + "->" + section.uniqueId);
    //                        section.tiles.splice(index, 0, tileFromSomewhere);

    //                        //_.defer(function () {
    //                        //    $(tileDiv).remove();
    //                        //});
    //                    }
    //                }
    //            }
    //        });
    //    });
    //},

    //resetTiles: function () {
    //    var dynamicSection = $(ui.metro_section_selector + '+.' + ui.metro_section_overflow).each(function () {
    //        var section = $(this);
    //        var prevSection = section.prev();
    //        $(ui.tile_selector, section).appendTo(prevSection);
    //        section.remove();
    //    });
    //},

    //reflow: function (fromIndex) {
    //    var metroSectionHeight = $(window).height(); 

    //    $(ui.tile_selector).slice(fromIndex | 0).each(function (index, item) {
    //        var tile = $(item);
    //        var pos = tile.offset();

    //        if (tile.index() > 0 && (pos.top + tile.height()) > metroSectionHeight) {
    //            var mySection = tile.parents(ui.metro_section_selector);
    //            var nextSection = mySection.next();

    //            // If the next section isn't a dynamically created section especially
    //            // made to hold overflowing tiles, then move the tiles to that section.
    //            // otherwise make a new dynamic section.
    //            if (nextSection.length > 0 && nextSection.hasClass(ui.metro_section_overflow)) {
    //                nextSection.prepend(tile);
    //                return _.delay(function () {
    //                    reflow(index + 1)
    //                }, 100);
    //            }
    //            else {
    //                nextSection = $('<div />').addClass(ui.metro_section).addClass(ui.metro_section_overflow);
    //                nextSection.insertAfter(mySection);
    //                //nextSection.appendTo(mySection.parent());
    //                nextSection.prepend(tile);

    //                return _.delay(function () {
    //                    reflow(index + 1)
    //                }, 100);
    //            }
    //        }
    //    });

    //    ui.makeSortable();
    //},
    
    /*
        Animate a full screen splash
    */

/*
    splashScreen: function (colorClass, icon, complete) {
        ui.hideAllIframes();

        return $("<div/>")
            .addClass(colorClass)
            .css({
                'position': 'absolute',
                'left': -($(window).width() / 4) + 'px',
                'top': $(window).height() / 4,
                'width': $(window).width() / 4 + 'px',
                'height': $(window).height() / 4 + 'px',
                'z-index': ui.splash_screen_zindex,
                'opacity': 0.3
            })
            .appendTo(document.body)
            .animate({
                left: '50px',
                top: '50px',
                'width': $(window).width() - 100 + 'px',
                'height': $(window).height() - 100 + 'px',
                'opacity': 1.0
            }, 500, function () {
                $(this).animate({
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%'
                }, 500, function () {
                    complete($(this));
                    ui.restoreAllIframes();
                });
            })
            .append(
                $('<img />')
                    .attr('src', icon)
                    .addClass(ui.splash_screen_icon_class)
                    .css({
                        'position': 'absolute',
                        'left': ($(window).width() - 512) / 2,
                        'top': ($(window).height() - 512) / 2
                    })
            );
    },


*/

    settings: function () {
        if (viewModel.user().isAnonymous)
            ui.login();
        else {
            ui.splashScreen(ui.settings_splash_color, ui.settings_splash_icon, function (div) {
                ui.launchApp("Settings", "Settings", ui.settings_page, function () {
                    div.fadeOut();
                });
            });
        }
    },

    apps: function () {
        ui.splashScreen(ui.appStore_splash_color, ui.appStore_splash_icon, function (div) {
            ui.launchApp("AppStore", "App Store", "AppStore.html", function () {
                div.fadeOut();
            });
        });
    },

    switchTheme: function (themename, changed) {
	//get all classes of the body
        var classes = $("body").prop("class").split(" ");
	//foreach loop
        _.each(classes, function (c) {
		//if we have our background class, we would like to remove it
            if (_.string.startsWith(c, 'theme-'))
                $("body").removeClass(c); //remove old background class
        });

	var res = themename.substring(6, themename.length);

	//right up here, we can set the new background-name in a cookie
	//document.cookie="background-image=" + res;

	if(endsWith(themename, "pl")){
		if(res.substring(0, 2) === "NG"){
			$("body").addClass("theme-NG-pl");
			document.cookie="background-image=theme-NG-pl";
			if(changed == true){
				alertify.log("Changed Theme to Picture of the Day from National Geographic");
			}//end if
		}// ende if
		else if(res.substring(0, 4) === "NASA"){
			$("body").addClass("theme-NASA-pl");
			document.cookie="background-image=theme-NASA-pl";
			if(changed == true){
				alertify.log("Changed Theme to NASA's Photo of the Day");
			}//ende if
		}
		else{
			//alert(res.substring(0, 4));
		}
	}//end if
	else{
		if(res === "white" && changed == true){
			var zitate_array = [ "<i>\"Was es alles gibt, was ich nicht brauche.</i>\"    -    Aristoteles", 
						"\"<i>Man soll weder annehmen noch besitzen, was man nicht wirklich zum Leben braucht.</i>\"    -    Mahatma Ghandi", 
						"\"<i>Arm ist nicht, wer wenig hat, sondern wer viel braucht.</i>\"    -    Peter Rosegger",
						"\"<i>In deinem Nichts hoff ich, das All zu finden.</i>\"    -    Johann Wolfgang von Goethe",
						"\"<i>Dies nichts ist mehr als etwas.</i>\"    -    William Shakespeare",
						"\"<i>Aus dem Nichts läßt sich nichts machen, höchstens ein Weltall.</i>\"    -    Manfred Hinrich",
						"\"<i>Leere läßt sich füllen, das Nichts hat keine Ränder.</i>\"    -    Manfred Hinrich",
						"\"<i>Nichts soll zwischen uns sein, ich liebe dieses Nichts.</i>\"    -    Mafred Hinrich"];
			var random_int = Math.floor((Math.random() * zitate_array.length));
			alertify.log("Changed Theme to <b>White</b>. <br><br><i>" + zitate_array[random_int] + "</i>");
			$("body").addClass(themename);
			document.cookie="background-image=" + themename;
		}//ende if
		else{
			//res = themename.substring(6, themename.length);
			$("body").addClass(themename);
			document.cookie="background-image=" + themename;
			if(changed == true){
				alertify.log("Changed Theme to " + res);
			}//ende if
		}//ende else
	}//end else
    },

    reload: function () {
        document.location.href = _.string.strLeft(document.location.href, '#');
    }
};


// This is the viewModel for the entire Dashboard. The starting point.
// It takes the currentUser (defined in the Droptiles.master), the UI config (as above)
// and the TileBuilders that comes from Tiles.js.
var viewModel = new DashboardModel("Start", [], window.currentUser, ui);

$(document).ready(function () {
    // Hide the body area until it is fully loaded in order to prevent flickrs
    $('#content').css('visibility', 'visible');

    ko.applyBindings(viewModel);

    ui.hideMetroSections();

    // See if user has a previous session where page setup was stored
    var cookie = window.currentUser.profileData || readCookie("p");
    if (cookie != null && cookie.length > 0) {
        try {
            viewModel.loadSectionsFromString(cookie, window.TileBuilders);
        } catch (e) {
            // Failed to load saved tiles. Load the default tiles.
            viewModel.loadSectionsFromString(DefaultTiles, window.TileBuilders);
        }
    }
    else {
        // No cookie, load default tiles. Defined in Tiles.js
        viewModel.loadSectionsFromString(DefaultTiles, window.TileBuilders);
    }

    ui.showMetroSections(function () {
        ui.attachTiles();
        ui.animateTiles();        
    });

	ui.loadBackground();

    // If we have the "add" cookie, then it means user went to app store
    // and then added some apps. The name of the apps are passed as a 
    // comma delimited cookie. So, add those tiles on the Dashboard.
    _.delay(function(){
        var addedApps = readCookie("add");
        if (!_.isEmpty(addedApps)) {
            var sections = viewModel.sections();
            var lastSection = sections[sections.length - 1];
            var sectionTiles = lastSection.tiles();
            //lastSection.show();
            window.scrollTo($("." + ui.metro_section).last().offset().left - 100, 0);

            var tileNames = addedApps.split(",");
            _.each(tileNames, function (name) {
                if (!_.isEmpty(name)) {
                    var builder = TileBuilders[name];
                    var newTileDef = builder(_.uniqueId(name));
                    var newTile = new Tile(newTileDef, ui, viewModel);
                
                    //newTile.index(sectionTiles.length);
                
                    lastSection.addTile(newTile);
                    ui.attach(newTile);
                }
            });

            createCookie("p", viewModel.toSectionString(), 2);
            createCookie("add", "");
        }
    }, 1000);

    // Subscribe again to detect changes made after the sections and tiles are 
    // created on the screen so that we can save the changes in section/tile
    viewModel.subscribeToChange(function (section, tiles) {
        _.defer(function () {
            console.log("viewModel subscribe notification");
            ui.attachTiles();

            var newOrder = viewModel.toSectionString();
            if (newOrder !== DefaultTiles) {
                console.log(newOrder);
                createCookie("p", newOrder, 2);

                if (!window.currentUser.isAnonymous) {
                    $.get("ServerStuff/SaveTiles.aspx");
                }
            }
        });
    });

    // Mouse wheel behavior for side scrolling.
    $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {
        if ($(document).height() <= $(window).height())
            window.scrollBy(-delta * 50, 0);
    });

    //$("#navbar").tooltip({
        //title: "I am still here. Come here to go back to Dashboard",
        //animate: true,
        //placement: 'bottom',
        //trigger: 'manual'
    //});


    // Handles browser back button. When user presses the back button,
    // it detects it and closes the current app.
    $(window).hashchange(function () {
        var hash = location.hash;

        if (hash == "" || hash == "#") {
            if (ui.appRunning)
                ui.closeApp();
        }
    })

    // The google search bar behavior on the navigation bar.
    $('#googleSearchText').keypress(function (e) {
        if (e.keyCode == 13)
            $('#googleForm').submit();
    });

    // Supports only IE 9+, Chrome, Firefox, Safari
    if ($.browser.msie && parseInt($.browser.version) < 8)
        $("#browser_incompatible").show();

    // Implement drag & scroll the window behavior
    if ($.browser.msie == null) {
        //$('#body').kinetic({
        //    moved: function (settings) {
        //        if (!window.dragging) {
        //            $(window).scrollLeft($(window).scrollLeft() + settings.scrollLeft);
        //            $(window).scrollTop($(window).scrollTop() + settings.scrollTop);
        //        }
        //    }
        //});
    }    
});
