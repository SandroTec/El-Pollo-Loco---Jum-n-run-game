
/**
 * Represents a throwable bottle object with physics, animation and collision logic.
 * Handles throwing, gravity, splash animation and sound effects.
 */
class ThrowableObject extends MoveableObject {

    /** @type {string[]} */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /** @type {string[]} */
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /** @type {boolean} */
    hasSplashed = false;

    /** @type {number} */
    splashStartTime = 0;

    /** @type {boolean} */
    removed = false;

    /** @type {{top:number,left:number,right:number,bottom:number}} */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /** @type {boolean} */
    soundPlayed = false;

    /** @type {boolean} */
    activThrow = false;

    /** @type {number} */
    speed_x;

    /**
     * Creates a throwable bottle object.
     *
     * @param {number} x - Start X position
     * @param {number} y - Start Y position
     * @param {Object} mo - Character or owner object (direction source)
     */
    constructor(x, y, mo) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');

        this.x = x;
        this.y = y;

        this.height = 75;
        this.width = 50;

        this.throw(mo);
    }

    /**
     * Initializes throw behaviour, physics and animation.
     *
     * @param {Object} mo
     */
    throw(mo) {
        if (this.activThrow) return;

        this.activThrow = true;

        this.startPhysics(mo);
        this.startMovement();
        this.startAnimation();
        this.startSoundLoop();
    }

    /**
     * Starts physics (gravity + initial velocity).
     *
     * @param {Object} mo
     */
    startPhysics(mo) {
        this.applyGravityForBottle();
        this.speed_y = 30;
        this.speed_x = mo.otherDirection ? -20 : 20;
    }

    /**
     * Handles horizontal movement while airborne.
     */
    startMovement() {
        setInterval(() => {
            if (this.isAboveGround() && !this.hasSplashed) {
                this.x += this.speed_x;
            }
        }, 50);
    }

    /**
     * Starts animation loop (flying + splash).
     */
    startAnimation() {
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);

        setInterval(() => {
            if (!this.hasSplashed) {
                this.handleFlight();
            } else {
                this.handleSplash();
            }
        }, 60);
    }

    /**
     * Handles bottle flight animation and ground collision.
     */
    handleFlight() {
        this.playAnimation(this.IMAGES_BOTTLE);

        if (this.bottleHitGround()) {
            this.triggerSplash();
        }
    }

    /**
     * Triggers splash state.
     */
    triggerSplash() {
        this.hasSplashed = true;
        this.splashStartTime = new Date().getTime();
        this.stopGravity();
    }

    /**
     * Handles splash animation and removal timing.
     */
    handleSplash() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        const timePassed = new Date().getTime() - this.splashStartTime;
        if (timePassed > 350) {
            this.removed = true;
            world.throwableObjects =
                world.throwableObjects.filter(obj => !obj.removed);
        }
    }

    /**
     * Starts collision sound detection loop.
     */
    startSoundLoop() {
        setInterval(() => {
            if (this.soundPlayed) return;
            if (this.bottleHitGround()) {
                world.soundManager.play('bottle');
                this.soundPlayed = true;
            }
            world.level.enemies.forEach(enemy => {
                if (this.isColiding(enemy)) {
                    world.soundManager.play('bottle');
                    this.soundPlayed = true;
                }
            });
        }, 100);
    }

    /**
     * Applies gravity to the bottle.
     */
    applyGravityForBottle() {
        setInterval(() => {
            if (!this.hasSplashed) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Stops bottle movement.
     */
    stopGravity() {
        this.speed_y = 0;
        this.speed_x = 0;
    }

    /**
     * Checks if bottle hit the ground.
     *
     * @returns {boolean}
     */
    bottleHitGround() {
        return this.y >= 318;
    }
}