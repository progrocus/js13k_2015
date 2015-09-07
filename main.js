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

var gameObjects = [];
var hero;

var init = function () {
    hero = new Sprite(ctx, scaledMap, 20, tileSize, tileSize, 0, 0, 0, 0);
    var background = new TiledBackground(ctx,scaledMap,2,tileSize);
    var scanLines = new TiledBackground(ctx,scaledMap,11,tileSize);
    gameObjects.push(background);
    gameObjects.push(hero);
    gameObjects.push(scanLines);
};

var reset = function () {

};

var update = function (dt) {
    gameObjects.forEach(function(o) {
        o.update(dt);
    });
};

//---------------------------------
//  RENDER
//---------------------------------
var render = function () {
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if (!scaledImageReady) return;


    gameObjects.forEach(function(o) {
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