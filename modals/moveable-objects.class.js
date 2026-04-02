
class MoveableObject extends DrawableObject {
   
    speed = 0.25;
    otherDirection = false;
    speed_y = 0;
    acceleration = 5;
    energy = 100;
    lastHit = 0;

    // object used for collision check.
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }}, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // modulo operator: if the currentImage is bigger than the length of the array, it will start again from the beginning of the array.
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speed_y = 40;
    }

    // checks if a moveable object is coliding with another mo.
    isColiding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // right side of the character is bigger than the left side of the object
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // bottom of the character is bigger than the top of the object
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // left side of the character is smaller than the right side of the object
               this.y + this.offset.right < mo.y + mo.height - mo.offset.left; // top of the character is smaller than the bottom of the object
        
    }

    hit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // new Date getTime -> get the milliseconds till 1970 to calculate the diffrences
        timePassed = timePassed /1000 // in seconds
        return timePassed < 2;
    }

    isDead() {
        return this.energy == 0;
        
    }

}