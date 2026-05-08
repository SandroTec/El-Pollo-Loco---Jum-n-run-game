/**
 * Represents the final boss enemy.
 *
 * @class Endboss
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {

    /** @type {string[]} Walking animations */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /** @type {string[]} Alert animations */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    /** @type {string[]} Attack animations */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /** @type {string[]} Hurt animations */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /** @type {string[]} Death animations */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /** @type {boolean} */
    isAlerted = true;

    /** @type {number} */
    isAlertedCounter = 0;

    /** @type {number} */
    energy = 100;

    /** @type {number} */
    dmg = 50;

    /**
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset = {
        top: 60,
        left: 25,
        right: 20,
        bottom: 10
    };

    /** @type {boolean} */
    boss = true;

    /** @type {boolean} */
    bossStarted = false;

    /** @type {boolean} */
    bossDead = false;

    /** @type {boolean} */
    deathHandled = false;

    /** @type {boolean} */
    soundPlayed = false;

    /**
     * Creates a new Endboss.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');

        this.x = world.level_end_x;
        this.y = 0;
        this.height = 470;
        this.width = 150;
        this.speed = this.getRandomSpeed();
        this.isDying = false;
        this.bossStarted = false
        this.animate();
        this.startSoundLoop();
    }

    /**
     * Generates random speed.
     * @returns {number}
     */
    getRandomSpeed() {
        return Math.random() * 25 + 15;
    }

    /**
     * Controls boss behavior loop.
     */
    animate() {
        if (this.deathHandled) return;
        setInterval(() => {
            if (world.character.x >= (world.level_end_x - 600) && !this.bossStarted) {
                this.bossStarted = true;
                world.endbossActivated = true;
            } else return
        }, 500)
        
        setInterval(() => {
            if (this.bossStarted) {
                if (this.handleAlert()) return;
                if (this.handleAttack()) return;
                if (this.handleHurt()) return;
                if (this.handleDeath()) return;

                this.bossMoves();
            }
        }, 200);
        
    }
    

    /**
     * Handles alert behavior.
     * @returns {boolean}
     */
    handleAlert() {
        if (this.isAlerted && this.bossStarted) {
            this.bossIsAlerted();
            return true;
        }
        return false;
    }

    /**
     * Handles attack behavior.
     * @returns {boolean}
     */
    handleAttack() {
        if (world.character.isColiding(this) && !this.isDying && !this.isDead()) {
            this.loadImages(this.IMAGES_ATTACK);
            this.playAnimation(this.IMAGES_ATTACK);
            return true;
        }
        return false;
    }

    /**
     * Handles hurt animation.
     * @returns {boolean}
     */
    handleHurt() {
        if (this.isHurt() && !this.isDead()) {
            this.loadImages(this.IMAGES_HURT);
            this.playAnimation(this.IMAGES_HURT);    
            return true;
        }
        return false;
    }

    /**
     * Handles death behavior.
     * @returns {boolean}
     */
    handleDeath() {
        if (this.isDead()) {
            this.bossStartsDying();
            this.bossIsDead();
            
            return true;
        }
        return false;
    }

    /**
     * Starts sound loop.
     */
    startSoundLoop() {
        setInterval(() => {
            if (!world.isPlaying) return;

            if (this.isDead() && !this.bossDead) {
                world.soundManager.play('chickenDying');
            }

            if (this.isHurt() && !this.isDead()) {
                world.soundManager.play('endbossHurt');
            }

            if (this.isAlerted && this.bossStarted) {
                world.soundManager.play('endbossAlert');
            }
        }, 1000);
    }

    /**
     * Plays alert animation.
     */
    bossIsAlerted() {
        this.loadImages(this.IMAGES_ALERT);
        this.playAnimation(this.IMAGES_ALERT);
        this.isAlertedCounter++;

        if (this.isAlertedCounter == 12) {
            this.isAlerted = false;
        }
    }

    /**
     * Handles death animation and removal.
     */
    bossIsDead() {
        if (this.deathHandled) return;

        if (this.isDying && this.isDead()) {
            this.loadImages(this.IMAGES_DEAD);
            this.playAnimation(this.IMAGES_DEAD);
            this.speed = 0;

            const timePassed = Date.now() - this.deathStartTime;

            if (timePassed >= 500) {
                this.bossDead = true;
                world.level.enemies = world.level.enemies.filter(
                    enemy => !enemy.bossDead
                );
                world.character.finalKill = true;
                this.deathHandled = true;
            }
        }
    }

    /**
     * Starts death sequence.
     */
    bossStartsDying() {
        if (!this.isDying && this.isDead()) {
            this.isDying = true;
            this.deathStartTime = Date.now();
        }
    }

    /**
     * Handles movement logic.
     */
    bossMoves() {
        if (world.character.x < this.x) {
            this.moveLeft();
        } else {
            this.otherDirection = true;
            this.moveRight();
        }

        this.loadImages(this.IMAGES_WALKING);
        this.playAnimation(this.IMAGES_WALKING);
    }
    

}