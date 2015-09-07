/**
 * Created by ehtd on 9/7/15.
 */

var Hero = function(ctx, image, tileId, width, height, x, y) {
    this.ctx = ctx;
    this.image = image;
    this.tileId = tileId;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.collisionGroup = [];
};

Hero.prototype = new Sprite();
Hero.prototype.constructor = Hero;

Hero.prototype.addCollisionGroup = function(group) {
    this.collisionGroup = group;
};

Hero.prototype.update = function(dt) {

    var nx = this.x;
    var ny = this.y;

    // TODO: handle the diagonal movement

    if(this.right) {
        nx  = Math.ceil(this.x  + (dt * MAXSPEED));
    }

    if(this.left) {
        nx  = Math.floor(this.x  - (dt * MAXSPEED));
    }

    if(this.up) {
        ny  = Math.floor(this.y  - (dt * MAXSPEED));
    }

    if(this.down) {
        ny  = Math.ceil(this.y  + (dt * MAXSPEED));
    }

    var mask = this.newCollisionMask(nx+10,ny+10,this.width-20, this.height-20);

    var collided = false;
    for (var i = 0; i < this.collisionGroup.length; i++) {
        var c = this.collisionGroup[i];
        if (this.intersects(mask, c.bounds())){
            collided = true;
            break;
        }
    }

    if (collided) return;

    this.x = nx;
    this.y = ny;
};
