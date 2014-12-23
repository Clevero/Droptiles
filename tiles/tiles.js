// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.DefaultTiles = [
    {
        name :"Section1",
        tiles: [
           //{ id: "flickr1", name:"flickr" },
	   { id: "owncloud", name: "owncloud" },
           { id: "newsreader", name: "newsreader" },
           { id: "settings", name: "settings" },
           { id: "catapi", name: "catapi" }       
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

   catapi: function (uniqueId) {
       return {
            uniqueId: uniqueId,
            name: "catapi",
            tileImage: "http://thecatapi.com/api/images/get?format=src&type=gif",
            label: "TheCatAPI.com !",
            size: "",
            color: "bg-color-darken",
            appIcon: "",
            appUrl: "javascript:history.go(0);"
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

    flickr: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "flickr",
            iconSrc: "img/Flickr alt 1.png",
            label: "Flickr",
            size: "tile-double tile-double-vertical",
            color: "bg-color-darken",
            appUrl: "Tiles/Flickr/App/FlickrApp.html",
            cssSrc: ["tiles/flickr/flickr.css"],
            scriptSrc: ["tiles/flickr/flickr.js?v=1"],
            //scriptSrc: ["tiles/flickr/flickr_interesting.js"],
            //cssSrc: ["tiles/flickr/flickr_interesting.css"],            
            initFunc: "flickr_load"
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
