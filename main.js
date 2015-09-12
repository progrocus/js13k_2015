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

var started = false;

var world = $1.world;

var map = new Image();
map.src = 'mvh.png';
map.onload = function () {
    scaledMap = resize(map, scale);
    scaledImageReady = true;
    init();
    started = true;

    //Music.init();
    //Music.play();
};

var backgroundLayer = [];
var foregroundLayer = [];
var gameObjects = [];
var walls = [];
var eggs = [];
var doors = [];
var rocks = [];
var chest;
var knights = [];
var swords = [];

var hero;


var init = function () {
    var background = new TiledBackground(ctx,scaledMap,ee,tileSize);
    backgroundLayer.push(background);

    hero = new Hero(ctx, scaledMap, tileSize, tileSize, 6*tileSize, 5*tileSize);
    gameObjects.push(hero);

    loadLevel();


    var scanLines = new TiledBackground(ctx,scaledMap,11,tileSize);
    foregroundLayer.push(scanLines);
};

var reset = function () {

};

var update = function (dt) {

    if (started == false) return;

    gameObjects.forEach(function(o) {
        o.update(dt);
    });

    knights.forEach(function(o) {
        o.update(dt);
    });

    swords.forEach(function(o) {
        o.update(dt);
    });

    if (eggs.length == 0) {
        chest.openChest();
        knights.forEach(function(k) {
            k.unlock();
        });
    }

    if (chest.hasKey == false) {
        doors.forEach(function(d) {
            d.openDoor();
        });

        knights.forEach(function(k) {
            k.seal();
        });
    }

    var s = [];
    swords.forEach(function(o){
        if (o.alive){
            s.push(o);
        }
    });

    swords = s;
};

var loadLevel = function() {

    var level = $1;
    for (var j = 0; j < yTiles; j++) {
        for (var i = 0; i < xTiles; i++) {
            var o = level.world[j][i];

            if (o >= 0 && o <= 10) {
                var path = new Sprite(ctx,
                    scaledMap, o, tileSize, tileSize, i*tileSize, j*tileSize);
                backgroundLayer.push(path);
            }
            else if (o >= 12 && o <= 20) {
                var wall = new Wall(ctx,
                    scaledMap, o, tileSize, tileSize, i*tileSize, j*tileSize);
                walls.push(wall);
            }
            else if (o == DD) {
                var door = new Door(ctx, scaledMap, o, tileSize, tileSize, i*tileSize, j*tileSize);
                doors.push(door);
            }
            else if (o == o_) {
                var egg = new Egg(ctx, scaledMap, o, tileSize, tileSize, i*tileSize, j*tileSize);
                eggs.push(egg);
            }
            else if (o == r_) {
                var rock = new Rock(i*tileSize, j*tileSize);
                rocks.push(rock);
            }
            else if (o == c_) {
                chest = new Chest(ctx, scaledMap, o, tileSize, tileSize, i*tileSize, j*tileSize);
            }
            else if (o == ku || o == kd) {
                var k = new Knight(i*tileSize, j*tileSize, o);
                knights.push(k);
            }
        }
    }

    rocks.forEach(function(r) {
        r.eggCollisionGroup = eggs;
        r.addGroupToCollisionGroup(walls);
        r.addGroupToCollisionGroup(doors);
        r.addItemToCollisionGroup(chest);
        r.addRocksToCollisionGroup(rocks);
        r.addGroupToCollisionGroup(knights);
    });

    hero.addRocksCollisionGroup(rocks);
    hero.eggCollisionGroup = eggs;
    hero.doorCollisionGroup = doors;
    hero.addChest(chest);
    hero.addCollisionGroup(walls);
    hero.knightCollisionGroup = knights;
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

    doors.forEach(function(o) {
        o.render();
    });

    chest.render(function(o) {
        o.render();
    });

    rocks.forEach(function(o) {
        o.render();
    });

    knights.forEach(function(o) {
        o.render();
    });

    swords.forEach(function(o) {
        o.render();
    });

    gameObjects.forEach(function(o) {
        o.render();
    });

    // TODO: draw order according to y distance
    //hero.render();

    //foregroundLayer.forEach(function(o) {
    //    o.render();
    //});
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

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

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