
class Character extends MoveableObject {

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
    world;
    walking_sound = new Audio('')
    

    constructor() {        
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.x = 50;
        this.y = 0;
        this.height = 180;
        this.width = 100;
        this.speed = 10;
        this.speed_y = 0;

        
        this.applyGravity();
        this.animate();
    }

    animate() {
        // moves the character if arrow key left or right is pressed.
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
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
            this.world.camera_x = -this.x + 150;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // if arrow keys left or right are pressed, the animation for walking will start.
                this.playAnimation(this.IMAGES_WALKING);
        
            }}, 100);
    }

}