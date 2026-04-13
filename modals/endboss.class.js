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
    offset = {
        top: 60,
        left: 15,
        right: 10,
        bottom: 10
    };
    enemyDead = false;
    constructor() {
       super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
       this.x = 1820; // fixed position for the boss;
       this.y = 0;
       this.height = 470;
       this.width = 150;
       this.speed = 1.5 * Math.random() + 5;
       this.energy = 100;
       this.isDying = false;
       this.animate();
    }

    animate() { 
        setInterval(() => {
            if (world.character.x >= 1000 && world.character.x <= 1400 && this.isAlerted <= 15 && !this.isDead()) {
                this.loadImages(this.IMAGES_ALERT);
                this.playAnimation(this.IMAGES_ALERT);
                this.isAlerted++
            } else if (world.character.isColiding(this)) {
                this.loadImages(this.IMAGES_ATTACK);
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isDead()) {
                this.startDying();
                this.loadImages(this.IMAGES_DEAD)
                this.playAnimation(this.IMAGES_DEAD);
                console.log(this.deathStartTime); 
                let timePassed = new Date().getTime() - this.deathStartTime;
                this.enemyDead = true;
                if (timePassed >= 3000) { // 3 Sekunden
                    world.level.enemies = world.level.enemies.filter(obj => !obj.enemyDead);
                }
            
            } else {
                this.moveLeft();
                this.loadImages(this.IMAGES_WALKING);
                this.playAnimation(this.IMAGES_WALKING);
            }
            
        }, 200);
    }

}