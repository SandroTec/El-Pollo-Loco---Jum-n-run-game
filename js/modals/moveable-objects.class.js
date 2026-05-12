/**
 * Base class for all movable game objects.
 * Provides physics, movement, collision detection and state handling.
 */
class MoveableObject extends DrawableObject {

    /** @type {number} */
    speed = 0.25;

    /** @type {boolean} */
    otherDirection = false;

    /** @type {number} */
    speed_y = 0;

    /** @type {number} */
    acceleration = 5;

    /** @type {number} */
    lastHit = 0;

    /** @type {boolean} */
    soundPlayed = false;

    /** @type {number} */
    dmg;

    /** @type {{top:number,left:number,right:number,bottom:number}} */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Requests fullscreen mode for the game canvas.
     */
    setCanvasToFullscreen() {
        canvas.requestFullscreen();
    }

    /**
     * Applies gravity to the object by modifying vertical position and velocity.
     * Runs continuously on a fixed interval.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.lastY = this.y;
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above the ground.
     *
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) return true;
        return this.y < 180;
    }

    /**
     * Plays an animation by cycling through image frames.
     *
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        const index = this.currentImage % images.length;
        const path = images[index];

        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves boss object faster to the left.
     */
    moveLeftBoss() {
        this.x -= 3 * this.speed;
    }

    /**
     * Makes the object jump by setting vertical velocity.
     */
    jump() {
        this.speed_y = 40;
    }

    /**
     * Checks collision between this object and another movable object.
     *
     * @param {Object} mo - Another game object.
     * @returns {boolean}
     */
    isColiding(mo) {
        const charLeft = this.x + this.offset.left;
        const charRight = this.x + this.width - this.offset.right;
        const charTop = this.y + this.offset.top;
        const charBottom = this.y + this.height - this.offset.bottom;

        const moLeft = mo.x + mo.offset.left;
        const moRight = mo.x + mo.width - mo.offset.right;
        const moTop = mo.y + mo.offset.top;
        const moBottom = mo.y + mo.height - mo.offset.bottom;

        const horizontalHit = charRight > moLeft && charLeft < moRight;
        const verticalHit = charBottom > moTop && charTop < moBottom;

        return horizontalHit && verticalHit;
    }

    /**
     * Applies damage to the object and updates last hit timestamp.
     *
     * @param {number} dmg - Damage amount.
     */
    hit(dmg) {
        this.energy -= dmg;

        if (this.energy < 0) {
            this.energy = 0;
            return;
        }

        this.lastHit = new Date().getTime();
    }

    /**
     * Checks if the object is currently in a hurt state.
     *
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 200;

        return timePassed < 2;
    }

    /**
     * Checks if the object is dead.
     *
     * @returns {boolean}
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Marks the object as dying and stores death timestamp.
     *
     */
    startDying() {
        this.isDying = true;
        this.deathStartTime = new Date().getTime();
    }

    /**
     * Checks if player jumps on top of another object.
     *
     * @param {Object} mo - Target object (enemy or entity).
     * @returns {boolean}
     */
    jumpOn(mo) {
        const charLeft = this.x;
        const charRight = this.x + this.width;
        const charBottom = this.y + this.height - this.offset.bottom;
        const enemyLeft = mo.x + mo.offset.left;
        const enemyRight = mo.x + mo.width - mo.offset.right;
        const enemyTop = mo.y + mo.offset.top;
        const falling = this.speed_y < 0;
        const horizontalOverlap = charRight > enemyLeft && charLeft < enemyRight;
        const verticalDistance = charBottom - enemyTop;
        return falling && horizontalOverlap && verticalDistance >= -25 && verticalDistance <= 25;
    }
}