
class MoveableObject extends DrawableObject {
   
    speed = 0.25;
    otherDirection = false;
    speed_y = 0;
    acceleration = 5;
    lastHit = 0;
    soundPlayed = false;
    // object used for collision check.
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * The function `setCanvasToFullscreen()` requests the browser to display the canvas in fullscreen
     * mode.
     */
    setCanvasToFullscreen() {
        canvas.requestFullscreen()
    }

    /**
     * The `applyGravity` function simulates gravity by decreasing the vertical position (`y`) of an
     * object over time while adjusting its vertical speed (`speed_y`) based on acceleration.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.lastY = this.y; // for jumpOn chicken enemy
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }}, 1000 / 25);
    }

    /**
     * The function `isAboveGround()` checks if an object is above the ground based on its
     * y-coordinate.
     * @returns The `isAboveGround()` function is returning a boolean value. If the object is an
     * instance of `ThrowableObject`, it will return `true`. Otherwise, it will return the result of
     * the comparison `this.y < 180`, which will be either `true` or `false` based on the value of
     * `this.y`.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // throwable objects should always fall
        } else {
            return this.y < 180
        }
    }

    /**
     * The function `playAnimation` cycles through an array of images to display them one by one.
     * @param images - The `images` parameter is an array containing paths to different image files.
     * The `playAnimation` function takes this array as input and cycles through the images in the
     * array to create an animation effect.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // modulo operator: if the currentImage is bigger than the length of the array, it will start again from the beginning of the array.
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /* The `moveRight()` function in the code snippet is responsible for moving an object to the right
    by incrementing its `x` property with the value of the `speed` property of the object. */
    moveRight() {
        this.x += this.speed;
    }

   /**
    * The `moveLeft()` function decreases the value of the `x` property by the `speed` property of the
    * object.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * The function `moveLeftBoss()` moves an object to the left by subtracting a calculated value from
     * its x-coordinate.
     */
    moveLeftBoss() {
        this.x -= 3 * (this.speed);
    }

    /**
     * The `jump()` function sets the vertical speed to 40.
     */
    jump() {
        this.speed_y = 40;
    }

    /**
     * The function isColiding checks if two objects are colliding based on their position and
     * dimensions.
     * @param mo - The `mo` parameter seems to represent another object in your game or application. It
     * has properties such as `x`, `y`, `width`, `height`, `offset`, `left`, `right`, `top`, and
     * `bottom`.
     * @returns The function is checking for collision between two objects based on their positions and
     * dimensions. It calculates the boundaries of each object taking into account any offsets, and
     * then checks if the objects are overlapping both horizontally and vertically. The function
     * returns a boolean value indicating whether the two objects are colliding or not.
     */
    isColiding(mo) {
        let charLeft = this.x + this.offset.left;
        let charRight = this.x + this.width - this.offset.right;
        let charTop = this.y + this.offset.top;
        let charBottom = this.y + this.height - this.offset.bottom;

        let moLeft = mo.x + mo.offset.left;
        let moRight = mo.x + mo.width - mo.offset.right;
        let moTop = mo.y + mo.offset.top;
        let moBottom = mo.y + mo.height - mo.offset.bottom;

        let horizontalHit = charRight > moLeft && charLeft < moRight;
        let verticalHit = charBottom > moTop && charTop < moBottom;

        return horizontalHit && verticalHit;
    }

    /* The `hit()` function is reducing the `energy` property of an object by 25 units. It then checks
    if the `energy` has become negative and sets it to 0 if that's the case. Additionally, it
    records the current time in milliseconds using `new Date().getTime()` in the `lastHit` property. */
    hit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        } else {this.lastHit = new Date().getTime()};
    }

    /**
     * The `isHurt` function checks if the time passed since the last hit is less than 2 seconds.
     * @returns The `isHurt()` function is returning a boolean value indicating whether the time passed
     * since the last hit is less than 2 seconds.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // new Date getTime -> get the milliseconds since 1970 to calculate the diffrences
        timePassed = timePassed /1000 // in seconds
        return timePassed < 2;
    }

    /**
     * The `isDead` function checks if the energy level of an object is zero to determine if it is
     * dead.
     * @returns The `isDead()` function is returning a boolean value based on the comparison
     * `this.energy == 0`. If the energy property of the object calling the function is equal to 0,
     * then the function will return `true`, indicating that the object is dead. Otherwise, it will
     * return `false`.
     */
    isDead() {
        return this.energy == 0;    
    }

    /**
     * The function `startDying()` sets the object's `isDying` property to true, records the time of
     * death, and sets the speed to 0.
     */
    startDying() {
        if (!this.soundPlayed) {
        this.soundPlayed = true;
        this.world.soundManager.play('stomp');
    }
        this.isDying = true;
        this.deathStartTime = new Date().getTime();
        this.speed = 0;
    }

    /**
     * The function `jumpOn` checks if a character is jumping on top of an enemy in a game by comparing
     * their positions and vertical distances.
     * @param mo - The `mo` parameter in the `jumpOn` function represents an object that likely
     * contains properties related to an enemy character in a game. Here are the properties used in the
     * function:
     * @returns The `jumpOn` function is returning a boolean value based on certain conditions. It
     * checks if the character is falling, if there is horizontal overlap between the character and the
     * enemy, and if the vertical distance between the character's bottom and the enemy's top is within
     * a specific range (-25 to 25). If all these conditions are met, the function returns `true`,
     * indicating that the character can
     */
    jumpOn(mo) {
        let charLeft = this.x;
        let charRight = this.x + this.width;
        let charBottom = this.y + this.height - this.offset.bottom;

        let enemyLeft = mo.x + mo.offset.left;
        let enemyRight = mo.x + mo.width - mo.offset.right;
        let enemyTop = mo.y + mo.offset.top;

        let falling = this.speed_y < 0;
        let horizontalOverlap =
            charRight > enemyLeft &&
            charLeft < enemyRight;

        let verticalDistance = charBottom - enemyTop;

        return falling && 
            horizontalOverlap &&
            verticalDistance >= -25 &&   // leicht drüber
            verticalDistance <= 25;      // nicht zu tief drin

    }
}