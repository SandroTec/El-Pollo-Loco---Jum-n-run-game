class ThrowableObject extends MoveableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    speed_x
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        //this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y; 
        this.height = 75;
        this.width = 50;
        this.throw();

        
    }

    throw() {
        
        this.speed_x = 20;
        this.speed_y = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += this.speed_x;
                
            }}, 50);
    }
}