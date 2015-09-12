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
    this.chasing = false;
    this.path = [];
};

Chaser.prototype = new Sprite();
Chaser.prototype.constructor = Chaser;

Chaser.prototype.update = function(dt) {

    if (this.chasing == false) return;

    var d = Math.round(dt * MAXSPEED);

    this.tickCount++;
    //if (this.tickCount > this.ticksPerFrame) {
        this.updatePath();
        this.tickCount = 0;
    //}

    var tx = Math.floor(this.x / tileSize);
    var ty = Math.floor(this.y / tileSize);

    if (this.path.length <= 0) return;

    var next = this.path[0];

    var x = next[0];
    var y = next[1];

    if (x < tx) {
        this.x -= d;
    }
    else if (x > tx) {
        this.x += d;
    }

    if (y < ty) {
        this.y -= d;
    }
    else if (y > ty) {
        this.y += d;
    }
    console.log("x: "+this.x+"y:,"+this.y)

};

Chaser.prototype.unlock = function() {

    if (this.chasing) return;

    this.chasing = true;
    this.updatePath();
};

Chaser.prototype.updatePath = function() {
    var tileX = Math.floor(this.x / tileSize);
    var tileY = Math.floor(this.y / tileSize);

    var hx = Math.floor(hero.x / tileSize);
    var hy = Math.floor(hero.y / tileSize);

    this.path = findPath(world,[tileX, tileY],[hx,hy]);
    this.path.splice(0,1);
    1;
};