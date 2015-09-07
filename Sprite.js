/**
 * Created by ehtd on 9/7/15.
 */

var Sprite = function(ctx, image, tileId, width, height, x, y) {
    this.ctx = ctx;
    this.image = image;
    this.tileId = tileId;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
};

Sprite.prototype.update = function() {
    // TODO: update x,y
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