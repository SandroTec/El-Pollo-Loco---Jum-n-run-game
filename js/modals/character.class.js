/**
 * Represents the main playable character in the game.
 * Handles movement, animations, sound behavior and interactions with the world.
 *
 * @class Character
 * @extends MoveableObject
 */
class Character extends MoveableObject {

    /** @type {number} Character height in pixels */
    height = 250;

    /** @type {number} Character width in pixels */
    width = 100;

    /** @type {string[]} Idle animation frames */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /** @type {string[]} Sleeping animation frames */
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /** @type {string[]} Walking animation frames */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} Jumping animation frames */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    /** @type {string[]} Hurt animation frames */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /** @type {string[]} Death animation frames */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /** @type {boolean} Indicates if character is walking */
    isWalking = false;

    /** @type {{top:number,left:number,right:number,bottom:number}} Collision offset */
    offset = {
        top: 100,
        left: 18,
        right: 15,
        bottom: 10
    };

    /** @type {number} Collected bottles */
    bottleCount = 0;

    /** @type {number} Collected coins */
    coinCount = 0;

    /** @type {boolean} Indicates if idle timer started */
    timerStartet = false;

    /** @type {?number} Idle start timestamp */
    startIdleTime = null;

    /** @type {boolean} Indicates sleeping state */
    sleeping = false;

    /** @type {boolean} Indicates dying state */
    isDying = false;

    /** @type {?number} Death start timestamp */
    deathStartTime = null;

    /** @type {boolean} Prevents repeated death sound */
    deathSoundPlayed = false;

    /** @type {boolean} Prevents repeated death animation */
    deathSequenceStarted = false;

    /** @type {boolean} Indicates final kill state */
    finalKill = false;

    /** @type {number} Damage value */
    dmg = 50;

    /**
     * Creates a new Character instance.
     * Loads all animations, initializes position and physics,
     * and starts sound and gravity systems.
     */
    constructor() {
        super().loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 0;
        this.y = 170;
        this.speed = 10;
        this.speed_y = 0;
        this.startSoundLoop();
        this.applyGravity();
    }

    /**
     * Starts movement and animation handling.
     */
    animate() {
        this.setKeyboardMoves();
        this.setAnimations();
    }

    /**
     * Handles keyboard input for movement.
     */
    setKeyboardMoves() {
        setInterval(() => {
            const world = this.world;
            if (!world || !world.isPlaying) return;
            if (world.keyboard.RIGHT && this.x < world.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (world.keyboard.LEFT && this.x > -200) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (world.keyboard.SPACE && !this.isAboveGround() && !this.isDead()) {
                this.jump();
            }
        }, 1000 / 60);
    }

    /**
     * Handles all sound effects.
     */
    startSoundLoop() {
        setInterval(() => {
            const world = this.world;
            if (!world) return;
            if (world.isPlaying) {
                this.playBackgroundMusic();
            }
            if (this.isDead() && !this.deathSoundPlayed) {
                this.playDyingSound() 
            }
            if (!world.isPlaying) return;
            const moving = world.keyboard.RIGHT || world.keyboard.LEFT;
            if (moving && !this.isDead()) {
                this.playMovingSound()
            } else {
                world.soundManager.stopWalk();
            }
            if (world.keyboard.SPACE && !this.isAboveGround()) {
                this.playJumpingSound()
            }
            world.level.enemies.forEach(enemy => {
                if (enemy.isDead() && enemy.removed === false) {
                    world.soundManager.play('splat');
                }
            });
            if (this.sleeping && !moving) {
                world.soundManager.playSnoring();
            }
        }, 100);
    }

    playBackgroundMusic() {
        world.soundManager.play('backgroundMusic')
    }

    /**
     * help handle dying sound effect.
     */
    playDyingSound() {
        this.deathSoundPlayed = true;
        world.soundManager.play('characterDying');
    }

    /**
     * help handle moving sound effect.
     */
    playMovingSound() {
        world.soundManager.playWalk();
        world.soundManager.stopSnoring();
        this.sleeping = false;  
    }

    /**
     * help handle jumping sound effect.
     */
    playJumpingSound() {
        world.soundManager.play('jump');
        world.soundManager.stopSnoring();
        this.sleeping = false;
    }

    /**
     * Controls animation states.
     */
    setAnimations() {
        setInterval(() => {
            const world = this.world;
            if (!world) return;

            if (this.handleDeathAnimation()) return;
            if (this.handleHurtAnimation()) return;
            if (this.handleJumpAnimation()) return;
            if (this.handleWalkAnimation()) return;

            this.handleIdleAnimation(world);

        }, 80);
    }

    /** @returns {boolean} */
    handleDeathAnimation() {
        if (!this.isDead()) return false;
        if (!this.deathSequenceStarted) {
            this.deathSequenceStarted = true;
            this.speed = 0;
            this.deathStartTime = Date.now();
        }
        this.playAnimation(this.IMAGES_DEAD);
        return true;

        }

    /** @returns {boolean} */
    handleHurtAnimation() {
        if (this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
            this.timerStartet = false;
            return true;
        }
        return false;
    }

    /** @returns {boolean} */
    handleJumpAnimation() {
        if (this.isAboveGround() && !this.isDead()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.timerStartet = false;
            return true;
        }
        return false;
    }

    /** @returns {boolean} */
    handleWalkAnimation() {
        if (
            (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
            !this.isDead() &&
            !this.isHurt()
        ) {
            this.playAnimation(this.IMAGES_WALKING);
            this.timerStartet = false;
            return true;
        }
        return false;
    }

    /**
     * Handles idle and sleeping animations.
     * @param {Object} world
     */
    handleIdleAnimation(world) {
        if (world.isPlaying && this.speed !== 0 && !this.isDead() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_IDLE);
            if (!this.timerStartet) {
                this.startIdleTime = Date.now();
                this.timerStartet = true;
            }

            const timePassed = Date.now() - this.startIdleTime;
            if (timePassed > 15000) {
                this.sleeping = true;
                this.playAnimation(this.IMAGES_SLEEPING);
            }
        }
    }
}