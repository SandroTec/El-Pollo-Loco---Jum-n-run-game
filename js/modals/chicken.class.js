/**
 * Represents a chicken enemy in the game.
 * Handles movement, animations, and death behavior.
 *
 * @class Chicken
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {

    /** @type {string[]} Walking animation frames */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /** @type {string[]} Death animation frames */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /** @type {number} Height of the chicken */
    height = 75;

    /** @type {number} Width of the chicken */
    width = 70;

    /** @type {number} Damage dealt to the player */
    dmg = 25;

    /** @type {{top:number,left:number,right:number,bottom:number}} Collision offset */
    offset = {
        top: 0,
        left: 15,
        right: 15,
        bottom: 0
    };

    /** @type {boolean} Indicates if enemy should be removed */
    enemyDead = false;

    /**
     * Creates a new Chicken instance.
     * Initializes position, speed, physics, and animation loops.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[1]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = this.getRandomXPosition();
        this.y = 370;
        this.energy = 25;
        this.speed = this.getRandomSpeed();

        this.isDying = false;

        this.applyGravity();
        this.animate();
    }

    /**
     * Generates a random X spawn position.
     * @returns {number}
     */
    getRandomXPosition() {
        const BASE_OFFSET = 300;
        const RANDOM_RANGE_SMALL = 200;
        const RANDOM_RANGE_LARGE = 8000;

        return BASE_OFFSET +
            (Math.random() * RANDOM_RANGE_SMALL) +
            (Math.random() * RANDOM_RANGE_LARGE);
    }

    /**
     * Generates a random movement speed.
     * @returns {number}
     */
    getRandomSpeed() {
        const BASE_SPEED = 1.5;
        const RANDOM_FACTOR = 5;

        return (Math.random() * RANDOM_FACTOR) + BASE_SPEED;
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