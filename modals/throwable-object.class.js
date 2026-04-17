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
                }} else {
                    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                    let timePassed = (new Date().getTime() - this.splashStartTime) / 1000;
                    if (timePassed > 1) {
                        this.removed = true
                        world.throwableObjects = world.throwableObjects.filter(obj => !obj.removed);
                    }
                }
                
            }, 100);
    }

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

    applyGravityForBottle() {
        setInterval(() => {
            if (!this.hasSplashed) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }}, 1000 / 25);
    }  

    stopGravity() {
        this.speed_y = 0;
        this.speed_x = 0;
    }

    bottleHitGround() {
        if (this.y >= 350) {return true;}
    }

}
 