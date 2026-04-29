class Endboss extends MoveableObject {
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
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
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    isAlerted = 0;
    dmg = 50;
    offset = {
        top: 60,
        left: 25,
        right: 20,
        bottom: 10
    };
    bossDead = false;
    soundPlayed = false;

    constructor() {
       super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
       this.x = 1820; // fixed position for the boss;
       this.y = 0;
       this.height = 470;
       this.width = 150;
       this.speed = 15 * Math.random() + 5;
       this.energy = 50;
       this.isDying = false;
       this.animate();
       this.startSoundLoop();
    }

   /**
    * The `animate` function controls the behavior of a boss character in a game, including detecting
    * player proximity, attacking, dying, and moving.
    */
    animate() { 
        setInterval(() => {
            if (world.character.x >= 1000 && world.character.x <= 1400 && this.isAlerted <= 10 && !this.isDead()) {
                this.bossIsAlerted();
            } else if (world.character.isColiding(this) && !this.isDying && !this.isDead()) {
                this.loadImages(this.IMAGES_ATTACK);
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isDead()){
                this.bossStartsDying();
                this.bossIsDead();
            }else {
                this.bossMoves();
            }
        }, 200);
    }

    /**
     * Starts a recurring sound loop for boss-related sound effects.
     *
     * Performs state checks every second and plays sounds depending
     * on the boss status:
     *
     * - Plays a death sound when the boss is defeated.
     * - Plays an alert/aggression sound while the boss is alerted.
     *
     * The loop only runs while the game is active (`world.isPlaying`).
     *
     * Requirements:
     * - `world` must be available.
     * - `world.soundManager` manages sound playback.
     * - `this.bossDead` indicates whether the boss death was handled.
     * - `this.bossIsAlerted` controls the boss alert state.
     *
     * Sounds used:
     * - `chickenDying`
     * - `endbossAlert`
     *
     * @method startSoundLoop
     * @returns {void}
     */
    startSoundLoop() {
        setInterval(() => {
            if (!world.isPlaying) return;
            if (this.isDead() && this.bossDead === false) {
                world.soundManager.play('chickenDying');
            }
            if (this.bossIsAlerted  <= 10) {
                world.soundManager.play('endbossAlert');
            }else return
        }, 1000);   
    }

    /**
     * The function bossIsAlerted() loads alert images, plays an alert animation, and increments the
     * isAlerted counter.
     */
    bossIsAlerted() {
        this.loadImages(this.IMAGES_ALERT);
        this.playAnimation(this.IMAGES_ALERT);
        this.isAlerted++
    }

    /**
     * The function `bossIsDead` handles the logic for when the boss enemy is defeated in a game,
     * including loading images, playing animations, and removing the enemy from the level after a
     * certain time has passed.
     */
    bossIsDead() {
            if (this.isDying && this.isDead()) {
                this.loadImages(this.IMAGES_DEAD);
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                let timePassed = new Date().getTime() - this.deathStartTime;
                if (timePassed >= 500) { 
                    this.bossDead = true;
                    world.level.enemies = world.level.enemies.filter(obj => !obj.bossDead);
                }
            }else return;
    }

    /**
     * Initializes the boss death sequence and stores its start timestamp.
     *
     * Triggers only once when the boss is dead and has not entered
     * the dying state yet.
     *
     * Actions:
     * - Sets `isDying` to `true`.
     * - Stores the current timestamp in `deathStartTime`.
     * - Returns the death sequence start time.
     *
     * If the death sequence has already started or the boss is not dead,
     * no action is performed.
     *
     * Requirements:
     * - `this.isDead()` checks whether the boss has been defeated.
     * - `this.isDying` prevents multiple initializations.
     *
     * @method bossStartsDying
     * @returns {number|undefined} Timestamp of death sequence start, or `undefined`.
     */
    bossStartsDying() {
        if (!this.isDying && this.isDead()) {
            const deathStartTime = new Date().getTime();
            this.isDying = true;
            this.deathStartTime = deathStartTime;
            return deathStartTime;
        } else return;
    }

    /**
     * The function bossMoves() moves the boss character to the left while displaying a walking
     * animation.
     */
    bossMoves() {
        this.moveLeft();
        this.loadImages(this.IMAGES_WALKING);
        this.playAnimation(this.IMAGES_WALKING);
    }

}