/**
 * Created by ehtd on 9/11/15.
 */

var Knight = function(x, y, tileId) {
    this.ctx = ctx;
    this.image = scaledMap;
    this.tileId = tileId;

    if (tileId == kd) {
        this.swordId = 37;
    } else if (tileId == ku) {
        this.swordId = 36;
    }

    this.width = tileSize;
    this.height = tileSize;
    this.x = x;
    this.y = y;
    this.tickCount = 0;
    this.ticksPerFrame = 2;

    this.unlocked = false;
    this.sealed = false;

};

Knight.prototype = new Sprite();
Knight.prototype.constructor = Knight;

Knight.prototype.unlock = function() {
    if (this.unlocked) return;

    this.unlocked = true;
    this.tileId++;
};

Knight.prototype.seal = function() {
    if (this.sealed) return;

    this.sealed = true;
    this.tileId--;
};

