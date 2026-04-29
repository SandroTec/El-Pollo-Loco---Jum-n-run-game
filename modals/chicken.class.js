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
    dmg = 25;
    offset = {
        top: 0,
        left: 15,
        right: 15,
        bottom: 0
    };
    enemyDead = false;

    constructor() {
       super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
       this.loadImages(this.IMAGES_WALKING);
       
       this.x = 200 + Math.random() * 500; // random position for the chicken;
       this.y = 370;
       this.energy = 25;
       this.speed = 2.5 * Math.random() + 0.5;
       this.isDying = false;
       this.applyGravity();
       this.animate();
    }

    /**
     * The `animate` function moves an object left at a set interval and triggers a method to handle
     * the object's death.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000/30);
        this.chickenDies()
    }

    /**
     * The function `chickenDies` periodically checks if a chicken is dead and initiates the dying
     * process if it is not already dying, then removes the dead chicken after a certain time period,
     * while also handling animations.
     */
    chickenDies() {
        this.deathStartTime = new Date().getTime();
        setInterval(() => {

            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0]);
                this.speed = 0;
                this.enemyDead = true;
                let timePassed = new Date().getTime() - this.deathStartTime;
                if (timePassed >= 5000) { 
                    world.level.enemies = world.level.enemies.filter(obj => !obj.enemyDead);
                    timePassed = 0;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

}