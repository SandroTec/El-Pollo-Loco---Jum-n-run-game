/**
 * Represents a small chicken enemy in the game.
 * Handles movement, animation, collision damage and death lifecycle.
 */
class SmallChicken extends MoveableObject {

    /** @type {string[]} */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** @type {string[]} */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /** @type {number} */
    height = 55;

    /** @type {number} */
    width = 70;

    /** @type {number} */
    dmg = 20;

    /** @type {{top:number,left:number,right:number,bottom:number}} */
    offset = {
        top: 0,
        left: 5,
        right: 5,
        bottom: 0
    };

    /** @type {boolean} */
    enemyDead = false;

    /**
     * Creates a new SmallChicken enemy instance.
     * Initializes position, energy, speed and animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 5000;
        this.y = 395;
        this.energy = 25;
        this.speed = 10 * Math.random() + 0.5;
        this.isDying = false;
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts movement and death handling loops.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.handleDeadState();
            }
        }, 50);
    }

    /**
     * Handles logic when the chicken is dead.
     */
    handleDeadState() {
        if (!this.deathStartTime) {
            this.deathStartTime = Date.now();
        }
        this.loadImage(this.IMAGES_DEAD[0]);
        this.speed = 0;
        const REMOVE_DELAY = 5000;
        const timePassed = Date.now() - this.deathStartTime;
        if (timePassed >= REMOVE_DELAY) {
            this.enemyDead = true;
            world.level.enemies = world.level.enemies.filter(
                enemy => !enemy.enemyDead
            );
        }
    }
}