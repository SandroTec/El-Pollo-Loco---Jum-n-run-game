class ThrowableObject extends MoveableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',

    ]
    speed_x;
    hasSplashed = false;
    splashStartTime = 0;
    removed = false;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    soundPlayed = false;
    activThrow = false

    constructor(x, y, mo) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y; 
        this.height = 75;
        this.width = 50;
        this.throw(mo);
        this.soundPlayed = false;
        
        
    }

    /**
     * The `animate` function loads images, plays animations, and handles a splash effect for a bottle
     * object in a game loop.
     */
    animate() {
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        setInterval(() => {
            if (!this.hasSplashed) {
                this.playAnimation(this.IMAGES_BOTTLE);
                if (this.bottleHitGround()) {
                    this.hasSplashed = true;
                    this.splashStartTime = new Date().getTime();
                    this.stopGravity();
                }
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                let timePassed =
                    (new Date().getTime() - this.splashStartTime);
                if (timePassed > 750) {
                    this.removed = true;
                    world.throwableObjects = world.throwableObjects.filter(obj => !obj.removed);
                }
            }
        }, 60);
    }

    /**
     * Starts a recurring sound loop for bottle collision sound effects.
     *
     * Performs collision checks at regular intervals and plays a sound
     * when the bottle hits the ground or collides with an enemy.
     *
     * Actions:
     * - Plays a bottle impact sound when the bottle hits the ground.
     * - Plays a bottle impact sound when the bottle collides with an enemy.
     * - Prevents the sound from playing multiple times using `soundPlayed`.
     *
     * Checks run every 100 ms until the sound has been triggered.
     *
     * Requirements:
     * - `this.bottleHitGround()` detects ground impact.
     * - `this.isColiding(enemy)` checks collision with enemies.
     * - `world.level.enemies` contains all enemies.
     * - `world.soundManager` manages sound playback.
     *
     * Sounds used:
     * - `bottle`
     *
     * @method soundLoop
     * @returns {void}
     */
    soundLoop() {
        setInterval(() => { 
            if (!this.soundPlayed) {
                if (this.bottleHitGround()) {
                    world.soundManager.play('bottle');
                    this.soundPlayed = true;
        }
        world.level.enemies.forEach(enemy => {
            if (this.isColiding(enemy)) {
            world.soundManager.play('bottle');
            this.soundPlayed = true;
            }});
        }}, 100);
    };
    
    /**
     * The function applies gravity to a bottle, sets its speed and direction, moves it horizontally,
     * updates a status bar, and triggers an animation.
     * @param mo - The `mo` parameter seems to be an object with properties used within the `throw`
     * function. It may have a property called `otherDirection` which is used to determine the
     * direction of the bottle throw. The function applies gravity to the bottle, sets initial speeds
     * for the bottle in the x and
     */
    throw(mo) {
        if (!this.activThrow) {
            this.activThrow = true;
            this.applyGravityForBottle();
            this.speed_y = 30;
            this.speed_x = mo.otherDirection ? -20 : 20;
            setInterval(() => {
                if (this.isAboveGround() && !this.hasSplashed) {
                    this.x += this.speed_x;
                }
            }, 50);
            world.character.bottleCount--;
            world.level.statusbar[2].setBottleBar(world.character.bottleCount);
            console.log(world.character.bottleCount)
            world.throwableObjects.pop()
            this.animate();
            this.soundLoop();
        }
        
    }

    /**
     * The function `applyGravityForBottle` simulates gravity by decreasing the vertical position of an
     * object over time.
     */
    applyGravityForBottle() {
        setInterval(() => {
            if (!this.hasSplashed) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }}, 1000 / 25);
    }  

    /**
     * The function "stopGravity" sets the vertical and horizontal speeds to zero.
     */
    stopGravity() {
        this.speed_y = 0;
        this.speed_x = 0;
        
    }

    /**
     * The function `bottleHitGround` checks if the bottle's y-coordinate is greater than or equal to
     * 320.
     * @returns The function `bottleHitGround()` will return `true` if the value of `this.y` is greater
     * than or equal to 320.
     */
    bottleHitGround() {
        if (this.y >= 318) {return true;}
        
    }

}
 