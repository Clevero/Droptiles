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
	   { id: "testTile", name: "testTile" }
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
            tileImage: "img/cloud.png",
            label: "ownCloud",
            size: "",
            color: "bg-color-blueOwncloud",
            appIcon: "img/cloud.png",
            appUrl: "https://owncloud.meinecloud.me"
        };
    },

   testTile: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "testTile",
            size: "",
	    slidesFrom: ["/droptiles/tiles/test.html"]
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
            tileImage: "/droptiles/kanboard.svg",
            label: "",
            size: "",
            color: "bg-color-white",
            appIcon: "/droptiles/kanboard.svg",
            appUrl: "http://meinecloud.me/kanboard",
	    appInNewWindow: true
        };
    },

   proxy: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "proxy",
            tileImage: "/droptiles/globus.png",
            label: "PHP-Proxy",
            size: "",
            color: "bg-color-darken",
            appIcon: "/droptiles/globus.png",
            appUrl: "http://meinecloud.me/php-proxy"
        };
    },

   catapi: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "catapi",
            tileImage: "http://thecatapi.com/api/images/get?format=src&type=gif&category=caturday",
            label: "TheCatAPI.com !",
            size: "tile-quadro tile-double-vertical",
            color: "bg-color-darken",
            appIcon: "",
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
            tileImage: "img/newsReader.png",
            label: "",
	    color: "bg-color-white",
            size: "",
            appIcon: "img/newsReader.png",
            appUrl: "https://tt-rss.meinecloud.me",
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
