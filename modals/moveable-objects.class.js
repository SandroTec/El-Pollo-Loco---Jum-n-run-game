
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
                this.lastY = this.y; // for jumpOn chicken enemy
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }}, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // throwable objects should always fall
        } else {
            return this.y < 180
        }
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
        let charLeft = this.x + this.offset.left;
        let charRight = this.x + this.width - this.offset.right;
        let charTop = this.y + this.offset.top;
        let charBottom = this.y + this.height - this.offset.bottom;

        let moLeft = mo.x + mo.offset.left;
        let moRight = mo.x + mo.width - mo.offset.right;
        let moTop = mo.y + mo.offset.top;
        let moBottom = mo.y + mo.height - mo.offset.bottom;

        // horizontale Überlappung
        let horizontalHit = charRight > moLeft && charLeft < moRight;

        // vertikale Überlappung, nur Schaden wenn **nicht von oben gesprungen**
        let verticalHit = charBottom > moTop &&
                        charTop < moBottom &&
                        !(this.jumpOn(mo)); // hier ausschließen

        return horizontalHit && verticalHit;
    }

    hit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        } else {this.lastHit = new Date().getTime()};
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // new Date getTime -> get the milliseconds since 1970 to calculate the diffrences
        timePassed = timePassed /1000 // in seconds
        return timePassed < 2;
    }

    isDead() {
        return this.energy == 0;    
    }

    jumpOn(mo) {
        let charBottom = this.y + this.height - this.offset.bottom;
        let lastCharBottom = this.lastY + this.height - this.offset.bottom;
        let enemyTop = mo.y + mo.offset.top;

        let charLeft = this.x + this.offset.left;
        let charRight = this.x + this.width - this.offset.right;
        let enemyLeft = mo.x + mo.offset.left;
        let enemyRight = mo.x + mo.width - mo.offset.right;

        let verticalHit = lastCharBottom <= enemyTop &&
                        charBottom >= enemyTop;

        let horizontalHit = charRight > enemyLeft &&
                            charLeft < enemyRight;

        return verticalHit && horizontalHit;
    }
}