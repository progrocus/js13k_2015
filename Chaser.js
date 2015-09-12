/**
 * Created by ehtd on 9/11/15.
 */

var Chaser = function(x, y) {
    this.ctx = ctx;
    this.image = scaledMap;
    this.tileId = 60;
    this.width = tileSize;
    this.height = tileSize;
    this.x = x;
    this.y = y;
    this.tickCount = 0;
    this.ticksPerFrame = 2;
};

Chaser.prototype = new Sprite();
Chaser.prototype.constructor = Chaser;

