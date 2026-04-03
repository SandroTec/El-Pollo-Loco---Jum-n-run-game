class World {
    character = new Character();
    throwableObjects = [];
    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld(keyboard);
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        // for clearing the canvas, so that you can draw the next frame without the previous one.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // moves camera
        this.ctx.translate(this.camera_x, 0);
        // draw a array of objects on the canvas
        this.addObjectsToMap(this.level.skyes);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); //moves camera back to draw static statusbar
        this.addToMap(this.level.statusbar);
        this.ctx.translate(this.camera_x, 0); // moves camera forward
        
        // draw the character and the enemies on the canvas
        this.addToMap(this.character);

        

        this.addObjectsToMap(this.level.enemies);
        // the function draw will be called as often as possible for your computer hardware, so that you have a smooth animation. 
        this.ctx.translate(-this.camera_x, 0);
        
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
        mo.draw(this.ctx)
        //mo.showHitBox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObject()
        }, 200);
    }

    checkThrowableObject() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y + 10);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        // checks if the character is coliding with an enemy.
            this.level.enemies.forEach(enemy => {
                if (this.character.isColiding(enemy) ) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            });
        
        // checks if the charcter is coliding with a coin.
            this.level.coins.forEach(coin => {
                if (this.character.isColiding(coin)) {
                    console.log('coin collected!')
                }
            });
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