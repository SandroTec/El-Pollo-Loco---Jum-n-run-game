
class Character extends MoveableObject {
    height = 250;
    width = 100;
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
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
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
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',

    ];
    isWalking = false;
    offset = {
        top: 100,
        left: 18,
        right: 15,
        bottom: 10
    };
    bottleCount = 0;
    coinCount = 0;
    timerStartet = false;
    startIdleTime = null;
    sleeping = false
    isDying = false;
    deathStartTime = null;
    deathSoundPlayed = false;
    deathSequenceStarted = false;
    finalKill = false;
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
     * The `animate` function sets up keyboard moves and animations.
     */
    animate() {
        this.setKeyboardMoves();
        this.setAnimations();
    }

    /**
     * The function `setKeyboardMoves` continuously checks for keyboard inputs to move a character
     * right, left, jump, or set the canvas to fullscreen in a game environment.
     */
    setKeyboardMoves() {
        setInterval(() => {
            if (!this.world) return; 
            if (!this.world.isPlaying) return; 
            if (this.world.keyboard.RIGHT && this.x < this.world.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > -200) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead()) {
                this.jump();
            }
            if (this.world.keyboard.D && !this.isDead()) {
               world.checkThrowableObject
                
            }

        }, 1000 / 60);
    }

    /**
     * Starts a recurring sound loop for character and gameplay sound effects.
     *
     * Runs checks every 100 ms and controls sound playback based on
     * the current game state:
     *
     * - Plays the death sound once when the character dies.
     * - Starts or stops walking sounds depending on movement.
     * - Plays a jump sound when the character jumps.
     * - Plays a "splat" sound for defeated enemies.
     *
     * Requirements:
     * - `this.world` must exist.
     * - `this.world.soundManager` handles audio playback.
     * - `this.world.keyboard` contains current input states.
     * - `this.world.level.enemies` contains all enemies.
     *
     * Sounds used:
     * - `characterDying`
     * - `jump`
     * - `splat`
     * - Walking loop via `playWalk()` / `stopWalk()`
     *
     * @method startSoundLoop
     * @returns {void}
     */
    startSoundLoop() {
        setInterval(() => {
            if (this.isDead() && !this.deathSoundPlayed) {
                this.deathSoundPlayed = true;
                this.world.soundManager.play('characterDying');
            }
            if (!this.world || !this.world.isPlaying) return;
            const moving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
            if (moving && !this.isDead()) {
                this.world.soundManager.playWalk();
                this.world.soundManager.stopSnoring();
                this.sleeping = false;
            } else {
                this.world.soundManager.stopWalk();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.world.soundManager.play('jump');
                this.world.soundManager.stopSnoring()
                this.sleeping = false;
            }
            this.world.level.enemies.forEach(enemy => {
                if (enemy.isDead() && enemy.removed === false) {
                    this.world.soundManager.play('splat');
                }
            });
            if (this.sleeping && !moving) {
                this.world.soundManager.playSnoring()
            } 
        }, 100);   
    }
    /**
     * The setAnimations function sets intervals to play different animations based on the character's
     * state.
     */
    setAnimations() {
        setInterval(() => {
            if (this.isDead() && !this.deathSequenceStarted) {
                this.playAnimation(this.IMAGES_DEAD);
                this.deathSequenceStarted = true
                this.speed = 0;
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
                this.timerStartet = false;
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.timerStartet = false;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.timerStartet = false;
            } else if (this.world.isPlaying) {
                this.playAnimation(this.IMAGES_IDLE);
                if (!this.timerStartet) {
                this.startIdleTime = new Date().getTime();
                this.timerStartet = true;
                }
                let timePassed = new Date().getTime() - this.startIdleTime;
                if (timePassed > 15000 && this.timerStartet) {
                    this.sleeping = true
                    this.playAnimation(this.IMAGES_SLEEPING);
                }
            }
        }, 100 );
    }



}