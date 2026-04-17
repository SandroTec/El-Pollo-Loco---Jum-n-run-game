
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
    world;
    walking_sound = new Audio('')
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

        this.applyGravity();
        this.animate();
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
            if (this.world.keyboard.RIGHT && this.x < this.world.level_end_x) {
                this.moveRight();
                this.otherDirection = false; // if the character moves right, the image will not be mirrored.
            }
            if (this.world.keyboard.LEFT && this.x > -200) {
                this.moveLeft();
                this.otherDirection = true; // if the character moves left, the image will be mirrored.
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            if (this.world.keyboard.F) {
                this.setCanvasToFullscreen()
            }
            this.world.camera_x = -this.x + 150;
        }, 1000 / 60);
    }

    /**
     * The setAnimations function sets intervals to play different animations based on the character's
     * state.
     */
    setAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            }
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // if arrow keys left or right are pressed, the animation for walking will start.
                this.playAnimation(this.IMAGES_WALKING);
        
            }}, 100);
    }
}