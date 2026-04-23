
class Character extends MoveableObject {
    height = 250;
    width = 100;
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

    constructor() {        
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
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

        }, 1000 / 60);
    }

    startSoundLoop() {
        setInterval(() => {
            if (!this.world || !this.world.isPlaying) return;

            const moving =
                this.world.keyboard.RIGHT ||
                this.world.keyboard.LEFT;

            if (moving && !this.isDead()) {
                this.world.soundManager.playWalk();
            } else {
                this.world.soundManager.stopWalk();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.world.soundManager.play('jump');
                 console.log('jump Sound');
            }
           
            let bottleBreak = this.world.throwableObjects.some(obj => obj.hasSplashed && !obj.removed);

            if (bottleBreak) {
                this.world.soundManager.play('bottle');
            }
            if ( this.world.level.enemies.forEach(enemy => { if (this.jumpOn(enemy)) {
                this.world.soundManager.play('splat');
                console.log('splat Sound')
            }
            if (this.startDying() && !this.isDead()) {
                this.world.soundManager.play('characterDying');
                console.log('dying Sound')
            }
        }, 100));   
    })}
    /**
     * The setAnimations function sets intervals to play different animations based on the character's
     * state.
     */
    setAnimations() {
        setInterval(() => {
            if (this.startDying() && !this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);
    }

}