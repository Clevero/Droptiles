﻿// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.DefaultTiles = [
    {
        name :"Section1",
        tiles: [
	   { id: "catapi", name: "catapi" },
	   { id: "owncloud", name: "owncloud" },
           { id: "newsreader", name: "newsreader" },
           { id: "kanboard", name: "kanboard" },
           { id: "proxy", name: "proxy" },
	   { id: "telegram", name: "telegram" }
        ]
    }
];


// Convert it to a serialized string
window.DefaultTiles = _.map(window.DefaultTiles, function (section) {
    return "" + section.name + "~" + (_.map(section.tiles, function (tile) {
        return "" + tile.id + "," + tile.name;
    })).join(".");
}).join("|");
        

// Definition of the tiles, their default values.
window.TileBuilders = {

    owncloud: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "owncloud",
            tileImage: "img/ownCloud_256px.png",
            label: "ownCloud",
            size: "",
            color: "bg-color-blueOwncloud",
            appIcon: "img/ownCloud_512px.png",
            appUrl: "http://meinecloud.me/owncloud"
        };
    },

   telegram: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "telegram",
            tileImage: "https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/telegram-256.png",
            label: "Telegram Web",
            size: "",
            color: "",
            appIcon: "https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/telegram-512.png",
            appUrl: "http://meinecloud.me:8000/app/index.html",
            appInNewWindow: true
        };
    },

   catAPI2: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "catAPI2",
	    tile_icon_src: 'https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/cat.png',
            size: "tile-double",
	    color: "bg-color-darken",
	    slidesFrom: ["/droptiles/tiles/catapi2/catapi2.html"]
        };
    },

   soundcloud: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "soundcloud",
            size: "tile-double tile-double-vertical",
            color: "bg-color-blueOwncloud",
	    slidesFrom: ["http://meinecloud.me/test.html"],
        };
    },

   kanboard: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "kanboard",
            tileImage: "/droptiles/img/kanboard.svg",
            label: "",
            size: "",
            color: "bg-color-white",
            appIcon: "/droptiles/img/kanboard.svg",
            appUrl: "http://meinecloud.me/kanboard",
	    appInNewWindow: true
        };
    },

   proxy: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "proxy",
            tileImage: "/droptiles/img/globus_256px.png",
            label: "PHP-Proxy",
            size: "",
            color: "bg-color-darken",
            appIcon: "/droptiles/img/globus_512px.png",
            appUrl: "http://meinecloud.me/php-proxy-webapp"
        };
    },

   catapi: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "catapi",
            tileImage: "http://thecatapi.com/api/images/get?format=src&category=caturday&size=small&",
            label: "TheCatAPI.com !",
	    tile_icon_src: 'https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/cat.png',
            size: "tile-triple tile-double-vertical",
            color: "bg-color-darken",
            appIcon: "https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/cat.png",
            appUrl: "http://meinecloud.me/droptiles"
        };
    },

   settings: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "settings",
            tileImage: "img/configure.png",
            label: "Settings",
            color: "bg-color-darken",
            appIcon: "img/configure.png",
            appUrl: "https://owncloud.meinecloud.me"
        };
    },

    newsreader: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "TT-RSS",
            tileImage: "img/rss_256px.png",
            label: "",
	    color: "bg-color-rssOrange",
            size: "",
            appIcon: "img/rss_512px.png",
            appUrl: "http://meinecloud.me/tt-rss",
        };
    },

    dynamicTile: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "dynamicTile",
            color: "bg-color-darkBlue",
            size: "tile-triple tile-double-vertical",
            label: "Server side Tile in ASP.NET",
            slidesFrom: ["tiles/DynamicTile/DynamicTile.aspx"]
            //cssSrc: ["tiles/DynamicTile/visualize.css"],
            //scriptSrc: ["tiles/DynamicTile/tablechart.js",
            //    "tiles/DynamicTile/DynamicTile.js"],
            //initFunc: "load_dynamic"
        }
    },
};
