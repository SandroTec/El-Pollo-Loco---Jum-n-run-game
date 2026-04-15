class World {
    startscreen = new Startscreen();
    character = new Character();
    endscreen = new Endscreen();
    throwableObjects = [];
    level;
    level_end_x = 720*2.5;

    isPlaying = false;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld(keyboard);
        this.drawStartscreen();
    }

    setWorld() {
        this.character.world = this;
    }

    drawStartscreen() {
        if (this.isPlaying == false) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.addToMap(this.startscreen);
            requestAnimationFrame(() => this.drawStartscreen());
        } else return;
    }
   

    draw() {
        if (!this.level) {
            return;
        }
        if (this.level) {
            // for clearing the canvas, so that you can draw the next frame without the previous one.
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            // draw a array of objects on the canvas
            this.addObjectsToMap(this.level.skyes);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.coins);
            this.addToMap(this.level.bottle);

            this.ctx.translate(-this.camera_x, 0); //moves camera back to draw static statusbar
            this.addObjectsToMap(this.level.statusbar);
            this.ctx.translate(this.camera_x, 0); // moves camera forward
            
            // draw the character and the enemies on the canvas
            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.level.enemies);
            // the function draw will be called as often as possible for your computer hardware, so that you have a smooth animation. 
            this.ctx.translate(-this.camera_x, 0);
        } 
        if (this.character.isDead()) {    
            this.addToMap(this.endscreen);
            this.isPlaying = false;
            this.stop()
            
        } else if (this.level && this.character.x >= this.level_end_x) {
            this.addToMap(this.level.win);
            this.isPlaying = false;
            this.stop()
        } 
            
        requestAnimationFrame(this.draw.bind(this));
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.showHitBox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObject()
        }, 1000 / 60);
    }

    checkThrowableObject() {
        if (this.keyboard.D && this.character.bottleCollected == true) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 10, this.character);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        // check enemy
        this.level.enemies.forEach(enemy => {
            let isJumpingOnEnemy = this.character.jumpOn(enemy);
            if (isJumpingOnEnemy) {
                enemy.hit();
            } else if (this.character.isColiding(enemy) && !enemy.isDying && enemy.enemyDead == false) {
                // Character wird nur getroffen, wenn er nicht von oben auf Enemy springt
                this.character.hit();
                this.level.statusbar[0].setPercentage(this.character.energy);
            }

            //check if bottle hits enemy or ground
            this.throwableObjects.forEach(throwableObject => {
                if (enemy.isColiding(throwableObject)) {
                    enemy.hit();
                    enemy.hit();
                    throwableObject.hasSplashed = true;
            }    
        })});

        // check Coins
        this.level.coins.forEach(coin => {
            if (this.character.isColiding(coin)) {
                this.character.coinCount += 1;
                coin.collectCoin();
                this.level.statusbar[1].setCoinBar(this.character.coinCount)
            }
        });
        // check SalsaBottle
        if (this.character.isColiding(this.level.bottle)) {
            bottle.collectBottle();
            this.character.bottleCollected = true;
            this.level.statusbar[2].setBottleBar(this.character.bottleCollected)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }   

    
    
}