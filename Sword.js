/**
 * Created by ehtd on 9/12/15.
 */

var Sword = function(x, y, tileId) {
    this.ctx = ctx;
    this.image = scaledMap;
    this.tileId = tileId;

    this.width = tileSize;
    this.height = tileSize;
    this.x = x;
    this.y = y;
    this.tickCount = 0;

    this.unlocked = false;
    this.sealed = false;

    this.alive = true;
};

Sword.prototype = new Sprite();
Sword.prototype.constructor = Sword;

Sword.prototype.render = function() {

    if (this.alive == false) return;

    var ox = this.tileId % 4;
    var oy = Math.floor(this.tileId / 4);
    var sx = ox * this.width;
    var sy = oy * this.height;

    ctx.drawImage(this.image,
        sx,
        sy,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height);
};

Sword.prototype.update = function(dt) {

    if (this.alive == false) return;

    var nx = this.x;
    var ny = this.y;

    var d = Math.round(dt * MAXSPEED * 5);

    if (this.tileId == swordUp) {
        ny -= d;
    } else if (this.tileId == swordDown) {
        ny += d;
    } else {
        1;
    }

    var mask = this.newCollisionMask(nx+10,ny+10,this.width-20, this.height-20);

    this.y = ny;

    if (this.y > tileSize*13 || this.y < 0) {
        this.alive = false;
    }
};


