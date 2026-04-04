class Endboss extends MoveableObject {
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    
    offset = {
        top: 10,
        left: 30,
        right: 30,
        bottom: 10
    };

    constructor() {
       super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
       this.loadImages(this.IMAGES_WALKING);
       this.x = 1820; // fixed position for the boss;
       this.y = 0;
       this.height = 470;
       this.width = 150;
       this.speed = 0.25 * Math.random() + 0.5;
       this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}