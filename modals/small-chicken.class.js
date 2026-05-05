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
    height = 35;

    /** @type {number} */
    width = 70;

    /** @type {number} */
    dmg = 25;

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
     * Chicken moves left until death and triggers death logic.
     *
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 30);

        this.handleDeath();
    }

    /**
     * Handles death animation, removal from world and state updates.
     *
     * @returns {void}
     */
    handleDeath() {
        this.deathStartTime = this.deathStartTime || new Date().getTime();

        setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0]);
                this.speed = 0;
                this.enemyDead = true;

                const timePassed = new Date().getTime() - this.deathStartTime;

                if (timePassed >= 5000) {
                    world.level.enemies = world.level.enemies.filter(
                        (obj) => !obj.enemyDead
                    );
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}