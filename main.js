/**
 * Created by ehtd on 9/6/15.
 */
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var scaledImageReady = false;

var scaledMap;
var scale = 2;
var tileSize = 16 * scale;
var xTiles = 13;
var yTiles = 13;

var map = new Image();
map.src = 'mvh.png';
map.onload = function () {
    scaledMap = resize(map, scale);
    scaledImageReady = true;
    init();
};

var backgroundLayer = [];
var foregroundLayer = [];
var gameObjects = [];
var walls = [];
var eggs = [];

var hero;

var init = function () {
    var background = new TiledBackground(ctx,scaledMap,2,tileSize);
    backgroundLayer.push(background);

    hero = new Hero(ctx, scaledMap, 20, tileSize, tileSize, 320, 160);
    gameObjects.push(hero);

    var wall = new Wall(ctx, scaledMap, 0, tileSize, tileSize, 220, 160);
    walls.push(wall);
    var wall = new Wall(ctx, scaledMap, 0, tileSize, tileSize, 252+32, 160);
    walls.push(wall);

    addWalls();
    hero.addCollisionGroup(walls);

    loadLevel();

    var scanLines = new TiledBackground(ctx,scaledMap,11,tileSize);
    foregroundLayer.push(scanLines);
};

var reset = function () {

};

var update = function (dt) {
    gameObjects.forEach(function(o) {
        o.update(dt);
    });

    if (eggs.length == 0) {
        // TODO: display key
    }
};

var addWalls = function () {
    // Top
    for (var i = 1; i < xTiles - 1 ; i++) {
        var wall = new Wall(ctx, scaledMap, 1, tileSize, tileSize, i*tileSize, 0);
        walls.push(wall);
    }

    // Bottom
    for (var i = 1; i < xTiles - 1 ; i++) {
        var wall = new Wall(ctx, scaledMap, 1, tileSize, tileSize, i*tileSize, (yTiles-1)*tileSize);
        walls.push(wall);
    }

    // Left
    for (var i = 1; i < xTiles - 1 ; i++) {
        var wall = new Wall(ctx, scaledMap, 0, tileSize, tileSize, 0, i*tileSize);
        walls.push(wall);
    }

    // Right
    for (var i = 1; i < xTiles - 1 ; i++) {
        var wall = new Wall(ctx, scaledMap, 0, tileSize, tileSize, (xTiles-1)*tileSize, i*tileSize);
        walls.push(wall);
    }

    // Corners
    var wall = new Wall(ctx, scaledMap, 12, tileSize, tileSize, 0, 0);
    walls.push(wall);
    wall = new Wall(ctx, scaledMap, 13, tileSize, tileSize, (xTiles-1)*tileSize, 0);
    walls.push(wall);
    wall = new Wall(ctx, scaledMap, 14, tileSize, tileSize, 0, (yTiles -1) * tileSize);
    walls.push(wall);
    wall = new Wall(ctx, scaledMap, 15, tileSize, tileSize, (xTiles-1)*tileSize, (yTiles -1) * tileSize);
    walls.push(wall);
};

var loadLevel = function() {
    var egg = new Egg(ctx, scaledMap, 19, tileSize, tileSize, 100, 100);
    eggs.push(egg);
    egg = new Egg(ctx, scaledMap, 19, tileSize, tileSize, 100, 300);
    eggs.push(egg);
    egg = new Egg(ctx, scaledMap, 19, tileSize, tileSize, 300, 50);
    eggs.push(egg);

    hero.eggCollisionGroup = eggs;
};

//---------------------------------
//  RENDER
//---------------------------------
var render = function () {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (!scaledImageReady) return;


    backgroundLayer.forEach(function(o) {
        o.render();
    });

    walls.forEach(function(o) {
        o.render();
    });

    eggs.forEach(function(o) {
        o.render();
    });

    gameObjects.forEach(function(o) {
        o.render();
    });

    foregroundLayer.forEach(function(o) {
        o.render();
    });
};

//---------------------------------
//  GAME LOOP
//---------------------------------
var timestamp = function () {
    if (window.performance && window.performance.now)
        return window.performance.now();
    else
        return new Date().getTime();
};

var fps  = 60,
    step = 1/fps,
    dt   = 0,
    now, last = timestamp();

var loop = function () {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while(dt > step) {
        dt = dt - step;
        update(step);
    }
    render(ctx, dt);
    last = now;
    requestAnimationFrame(loop);
};

//---------------------------------
//  INPUT
//---------------------------------
document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

var KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
var onkey = function (ev, key, down) {
    switch(key) {
        case KEY.LEFT:  hero.left  = down; return false;
        case KEY.RIGHT: hero.right = down; return false;
        case KEY.UP: hero.up  = down; return false;
        case KEY.DOWN: hero.down  = down; return false;
    }
};

//---------------------------------
//  UTILITIES
//---------------------------------
// http://phoboslab.org/log/2012/09/drawing-pixels-is-hard
var resize = function( img, scale ) {
    // Takes an image and a scaling factor and returns the scaled image

    // The original image is drawn into an offscreen canvas of the same size
    // and copied, pixel by pixel into another offscreen canvas with the
    // new size.

    var widthScaled = img.width * scale;
    var heightScaled = img.height * scale;

    var orig = document.createElement('canvas');
    orig.width = img.width;
    orig.height = img.height;
    var origCtx = orig.getContext('2d');
    origCtx.drawImage(img, 0, 0);
    var origPixels = origCtx.getImageData(0, 0, img.width, img.height);

    var scaled = document.createElement('canvas');
    scaled.width = widthScaled;
    scaled.height = heightScaled;
    var scaledCtx = scaled.getContext('2d');
    var scaledPixels = scaledCtx.getImageData( 0, 0, widthScaled, heightScaled );

    for( var y = 0; y < heightScaled; y++ ) {
        for( var x = 0; x < widthScaled; x++ ) {
            var index = (Math.floor(y / scale) * img.width + Math.floor(x / scale)) * 4;
            var indexScaled = (y * widthScaled + x) * 4;
            scaledPixels.data[ indexScaled ] = origPixels.data[ index ];
            scaledPixels.data[ indexScaled+1 ] = origPixels.data[ index+1 ];
            scaledPixels.data[ indexScaled+2 ] = origPixels.data[ index+2 ];
            scaledPixels.data[ indexScaled+3 ] = origPixels.data[ index+3 ];
        }
    }
    scaledCtx.putImageData( scaledPixels, 0, 0 );
    return scaled;
};

//---------------------------------
//  RUN
//---------------------------------
var w = window;
//requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        }
}

reset();
loop();