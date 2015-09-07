/**
 * Created by ehtd on 9/7/15.
 */

var MAXSPEED    = 32 * 4;

var Sprite = function(ctx, image, tileId, width, height, x, y, dx, dy) {
    this.ctx = ctx;
    this.image = image;
    this.tileId = tileId;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = dx != undefined ? dx : 0;
    this.dy = dy != undefined ? dy : 0;
};

Sprite.prototype.update = function(dt) {
    if(this.right) {
        this.x  = Math.ceil(this.x  + (dt * MAXSPEED));
    }

    if(this.left) {
        this.x  = Math.floor(this.x  - (dt * MAXSPEED));
    }

    if(this.up) {
        this.y  = Math.floor(this.y  - (dt * MAXSPEED));
    }

    if(this.down) {
        this.y  = Math.ceil(this.y  + (dt * MAXSPEED));
    }
};

Sprite.prototype.render = function() {

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

function bound(x, min, max) {
    return Math.max(min, Math.min(max, x));
}