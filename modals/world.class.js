/* The `World` class in JavaScript manages the game world, including setting up levels, drawing
elements on the canvas, handling collisions, and controlling game flow. */
class World {
    startscreen = new Startscreen();
    character;
    endscreen = new Endscreen();
    soundManager = new SoundManager();
    throwableObjects = [];
    level;
    level_end_x = 720*2.5;
    isPlaying = false;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    youWon = false;
    gameRestart = document.getElementById('restartBtn');
    animationId;

    homeBtn = document.getElementById('homeBtn');
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character(this); 
        this.setWorld(keyboard);
        this.character.animate(); 
        this.drawStartscreen();
        this.animationId = null;
              
    }

    /**
     * The function `setWorld()` sets the world property of the character object to the current object.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * The drawStartscreen function clears the canvas, adds the startscreen to the map, hides the game
     * restart button, and continuously redraws the startscreen until the game is playing.
     * @returns In the `drawStartscreen` function, if the condition `this.isPlaying == false` is true,
     * the function will clear the canvas, add elements to the map, hide the game restart element, and
     * then call `requestAnimationFrame` to recursively call `drawStartscreen` until `this.isPlaying`
     * is true. If the condition is false, the function will return without doing anything.
     */
    drawStartscreen() {
        if (this.isPlaying == false) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.addToMap(this.startscreen);
            this.gameRestart.style.display = 'none';
            requestAnimationFrame(() => this.drawStartscreen());
        } else return;
    }
   
    /**
     * The draw function in JavaScript clears the canvas, translates the context, sets up the level,
     * status bars, characters, and enemies, checks for game over or win conditions, and requests
     * animation frame for continuous drawing.
     * @returns In the provided code snippet, the `draw()` function is returning either nothing
     * (undefined) or the result of calling `requestAnimationFrame(this.draw.bind(this))`.
     */

    draw() {
        if (!this.level) return;
            this.camera_x = -this.character.x + 150;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.save();
            this.ctx.translate(this.camera_x, 0);
            this.setUpLevel();
            this.ctx.translate(-this.camera_x, 0);
            this.setUpStatusbars();
            this.ctx.translate(this.camera_x, 0);
            this.setUpCharacterAndEnemies();
            this.ctx.restore();
            this.homeBtn.style.display = 'none';
            if (this.character.isDead()) {
                if (!this.character.isDying) {
                    this.character.startDying();
                }
                let timePassed = new Date().getTime() - this.character.deathStartTime;
                if (timePassed > 500) {
                    this.gameOver();
                    return;
                }
            }
            if (this.character.x >= this.level_end_x) {
                this.gameWin();
                return;
            }
        this.animationId = requestAnimationFrame(this.draw.bind(this));
    }

        /**
     * The `gameOver` function adds the end screen to the map, stops the game, and displays the game
     * restart button.
     */
    gameOver() {
            this.addToMap(this.endscreen);
            this.gameRestart.style.display = 'flex';
            this.homeBtn.style.display = 'block';
            this.stop();
            this.soundManager.stopAll();
            this.isPlaying = false;   
        
    }

    /**
     * The `gameWin` function adds the win message to the map, stops the game, and displays the game
     * restart button.
     */
    gameWin() {
        this.addToMap(this.level.win);
        this.gameRestart.style.display = 'flex';
        this.homeBtn.style.display = 'block';
        this.stop();
        this.soundManager.stopAll();
        this.isPlaying = false;
        this.youWon = true;

    }

    /**
     * The function `addObjectsToMap` iterates through an array of objects and adds each object to a
     * map.
     * @param objects - An array of objects that need to be added to a map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * The function `addToMap` in JavaScript flips the image if `mo.otherDirection` is true, draws
     * `mo`, and then flips the image back if `mo.otherDirection` is true.
     * @param mo - It looks like the `addToMap` function takes an object `mo` as a parameter. The
     * object `mo` seems to have properties such as `otherDirection`, `draw`, `showHitBox`, and `ctx`.
     * The function checks the `otherDirection` property of the `mo`
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.showHitBox(this.ctx);  Hitbox for offsets
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * The `run` function sets up a recurring interval to check for collisions and throwable objects in
     * a game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObject()
        }, 100);
    }

    /**
     * The function `checkThrowableObject` creates a new `ThrowableObject` and adds it to an array if a
     * specific condition is met.
     */
    checkThrowableObject() {
        if (this.keyboard.D && this.character.bottleCollected == true) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 10, this.character);
            this.throwableObjects.push(bottle);
            
        }
    }

    /**
     * The function `checkCollisions` checks for collisions with enemies, coins, and a salsa bottle in
     * a game.
     */
    checkCollisions() {
        if (!this.isPlaying) return;
        //check Collision with enemy for character and throwableObject
        this.checkEnemies();
        // check Coins
        this.checkCoins();
        // check SalsaBottle
        this.checkBottle();
    }

    /**
     * The function `checkEnemies` iterates through enemies in a game level, checking for collisions
     * with the player character and throwable objects, and triggering appropriate actions based on the
     * interactions.
     */
    checkEnemies() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isDying && !enemy.isDead()){
                this.soundManager.play('chickenDying');
                return
            };
            let isJumpingOnEnemy = this.character.jumpOn(enemy);
            if (isJumpingOnEnemy) {
                enemy.energy = 0;;
                this.soundManager.play('splat');
                return;
            } else if (this.character.isColiding(enemy) && !enemy.isDying && !enemy.isDead() && !this.character.isHurt()) {
                this.character.hit(enemy.dmg);
                this.soundManager.play('hit');
                this.level.statusbar[0].setPercentage(this.character.energy);
            }
        this.throwableObjects.forEach(throwableObject => {
                if (enemy.isColiding(throwableObject)) {
                    enemy.energy -= 50;
                    throwableObject.hasSplashed = true;
            }    
        })});
    }

    /**
     * The `checkCoins` function iterates through coins in the level, increments the character's coin
     * count if there is a collision, collects the coin, and updates the coin count on the status bar.
     */
    checkCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColiding(coin)) {
                coin.collectCoin();
                this.character.coinCount += 1;
                this.level.statusbar[1].setCoinBar(this.character.coinCount);
                this.soundManager.play('collectSound');
            }
        });
    }
    
    /**
     * The function `checkBottle` checks if the character is colliding with a bottle in the level and
     * collects it if so.
     */
    checkBottle() {
        if (this.character.isColiding(this.level.bottle)) {
            bottle.collectBottle();
            this.character.bottleCollected = true;
            this.level.statusbar[2].setBottleBar(this.character.bottleCollected);
            this.soundManager.play('collectSound');
        }
    }

    /**
     * The flipImage function flips an image horizontally in a canvas context.
     * @param mo - The `mo` parameter seems to represent an image object with the following properties:
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * The function `flipImageBack` flips an image back horizontally by changing its x-coordinate and
     * restoring the canvas context.
     * @param mo - The parameter `mo` likely represents an object with properties related to an image
     * or graphical element. In the provided function `flipImageBack`, it appears to be used to flip
     * the image horizontally by changing its `x` property. The `this.ctx.restore()` call suggests that
     * this function is part of
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }   

    /**
     * The setUpLevel function adds various objects to the game map based on the level configuration.
     */
    setUpLevel() {
        this.addObjectsToMap(this.level.skyes);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.level.bottle);
    }
    
    /**
     * The setUpStatusbars function in JavaScript translates the canvas context to draw a static status
     * bar and then translates it back.
     */
    setUpStatusbars() {
        this.addObjectsToMap(this.level.statusbar);
    }

    /**
     * The function sets up the character and enemies on the canvas for smooth animation.
     */
    setUpCharacterAndEnemies() {
        // draw the character and the enemies on the canvas
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        
    }

    /**
     * The `stop` function in JavaScript cancels the current animation frame if it is running.
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
            this.soundManager.stopAll();
        }
    }
}