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
    constructor(x, y, mo) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y; 
        this.height = 75;
        this.width = 50;
        this.throw(mo);
        
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
                if (this.bottleHitGround() || world.level.enemies.forEach(enemy => {this.isColiding(enemy)})) {
                    this.hasSplashed = true;
                    this.splashStartTime = new Date().getTime();
                    this.stopGravity();
                    world.soundManager.play('bottle');
                }
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                let timePassed =
                    (new Date().getTime() - this.splashStartTime) / 1000;
                if (timePassed > 3) {
                    this.removed = true;
                    world.throwableObjects = world.throwableObjects.filter(obj => !obj.removed);
                }
            }
        }, 1000/60);
    }

    /**
     * The function applies gravity to a bottle, sets its speed and direction, moves it horizontally,
     * updates a status bar, and triggers an animation.
     * @param mo - The `mo` parameter seems to be an object with properties used within the `throw`
     * function. It may have a property called `otherDirection` which is used to determine the
     * direction of the bottle throw. The function applies gravity to the bottle, sets initial speeds
     * for the bottle in the x and
     */
    throw(mo) {
        this.applyGravityForBottle();
        this.speed_y = 30;
        this.speed_x = mo.otherDirection ? -20 : 20;
        setInterval(() => {
            if (this.isAboveGround() && !this.hasSplashed) {
                this.x += this.speed_x;
            }
        }, 50);
        world.character.bottleCollected = false;
        world.level.statusbar[2].setBottleBar(world.character.bottleCollected)
        this.animate();
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
     * 350.
     * @returns The function `bottleHitGround()` will return `true` if the value of `this.y` is greater
     * than or equal to 350.
     */
    bottleHitGround() {
        if (this.y >= 350) {return true;}
    }

}
 