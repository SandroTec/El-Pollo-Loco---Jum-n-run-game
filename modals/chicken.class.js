class Chicken extends MoveableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        
    ];
    height = 55;
    width = 70;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    enemyDead = false;
    constructor() {
       super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
       this.loadImages(this.IMAGES_WALKING);
       
       this.x = 200 + Math.random() * 500; // random position for the chicken;
       this.y = 370;
       this.energy = 25;
       this.speed = 0.25 * Math.random() + 0.5;
       this.applyGravity();
       this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDying) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead() && !this.isDying) {
                this.startDying();
            }

            if (this.isDying) {
                this.loadImage(this.IMAGES_DEAD[0]);

                let timePassed = new Date().getTime() - this.deathStartTime;

                if (timePassed > 2000) { // 2 Sekunden
                    this.enemyDead = true;
                    world.level.enemies = world.level.enemies.filter(obj => !obj.enemyDead);
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 200);
    }

    startDying() {
        this.isDying = true;
        this.deathStartTime = new Date().getTime();
        this.speed = 0;
    }

    
}