// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.DefaultTiles = [
    {
        name :"Section1",
        tiles: [
           { id: "flickr1", name:"flickr" },
	   { id: "owncloud", name: "owncloud" },        
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
            tileImage: "img/ownCloud.svg",
            label: "",
            color: "bg-color-blue",
	    size: "tile-double",
            appIcon: "img/ownCloud.svg",
            appUrl: "https://owncloud.meinecloud.me"
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
