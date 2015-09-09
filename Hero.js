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
    this.eggCollisionGroup =[];
    this.doorCollisionGroup = [];
    this.chestToCollide = null;
};

Hero.prototype = new Sprite();
Hero.prototype.constructor = Hero;

Hero.prototype.addCollisionGroup = function(group) {
    this.collisionGroup = group;
};

Hero.prototype.addEggCollisionGroup = function(group) {
    this.eggCollisionGroup = group;
};

Hero.prototype.addChest = function(chest) {
    this.chestToCollide = chest;
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

    var collided = this.collided(this.collisionGroup, mask);
    if (collided) return;

    collided = this.exitDoor(this.doorCollisionGroup, mask);
    if (collided) return;

    this.x = nx;
    this.y = ny;

    this.collectEgg(this.eggCollisionGroup, mask);
    this.collideWithChest(mask);
};

Hero.prototype.collideWithChest = function(mask) {

    if (this.intersects(mask, this.chestToCollide.bounds())){
        if (this.chestToCollide.isOpen && this.chestToCollide.hasKey){
            this.chestToCollide.pickKey();
        }
    }
};

Hero.prototype.collided = function (group, mask) {

    var collided = false;
    for (var i = 0; i < group.length; i++) {
        var c = group[i];
        if (this.intersects(mask, c.bounds())){
            collided = true;
            break;
        }
    }
    return collided;
};

Hero.prototype.collectEgg = function (group, mask) {

    var collided = false;
    for (var i = 0; i < group.length; i++) {
        var c = group[i];

        if (this.intersects(mask, c.bounds())) {
            collided = true;
            c.collected();
            group.splice(i,1);
            break;
        }
    }
    return collided;
};

Hero.prototype.exitDoor = function (group, mask) {
    var collided = false;
    for (var i = 0; i < group.length; i++) {
        var c = group[i];


        if (this.intersects(mask, c.bounds())) {
            if (c.isOpen) {
                collided = false;
                this.win();
            } else {
                collided = true;
            }
            break;
        }
    }
    return collided;
};

Hero.prototype.win = function () {
    console.log("win");
};

Hero.prototype.fail = function () {

};
