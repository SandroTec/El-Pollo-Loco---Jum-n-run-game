
/**
 * Core game engine that manages rendering, game state, collisions and game flow.
 * Acts as central controller between canvas, entities and game systems.
 */
class World {

    /** @type {Startscreen} */
    startscreen = new Startscreen();

    /** @type {Character} */
    character;

    /** @type {Endscreen} */
    endscreen = new Endscreen();

    /** @type {SoundManager} */
    soundManager = new SoundManager();

    /** @type {Level} */
    level;

    /** @type {number} */
    level_end_x = 720 * 9.5;

    /** @type {boolean} */
    isPlaying = false;

    /** @type {HTMLCanvasElement} */
    canvas;

    /** @type {CanvasRenderingContext2D} */
    ctx;

    /** @type {Keyboard} */
    keyboard;

    /** @type {number} */
    camera_x = -100;

    /** @type {boolean} */
    youWon = false;

    /** @type {HTMLElement} */
    gameRestart = document.getElementById('restartBtn');

    /** @type {number | null} */
    animationId = null;

    /** @type {number | null} */
    runIntervall = null;

    /** @type {boolean} */
    running = true;

    /** @type {Array} */
    throwableObjects = [];

    /** @type {boolean} */
    lastThrowPressed = false;

    /** @type {HTMLElement} */
    homeBtn = document.getElementById('homeBtn');

    /**
     * Creates the game world and initializes rendering and character systems.
     *
     * @param {HTMLCanvasElement} canvas
     * @param {Keyboard} keyboard
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character(this);

        this.setWorld();
        this.character.animate();

        this.drawStartscreen();
    }

    /**
     * Links character to world instance.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Renders the start screen until game starts.
     */
    drawStartscreen() {
        if (this.isPlaying) return;

        this.clearScreen();
        this.addToMap(this.startscreen);

        this.gameRestart.style.display = 'none';

        requestAnimationFrame(() => this.drawStartscreen());
    }

    /**
     * Main game render loop.
     */
    draw() {
        if (!this.running || !this.level) return;

        this.updateCamera();
        this.clearScreen();

        this.ctx.save();

        this.renderWorld();

        this.ctx.restore();

        this.handleHUD();
        this.checkGameState();

        this.animationId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Updates camera position.
     */
    updateCamera() {
        this.camera_x = -this.character.x + 150;
    }

    /**
     * Clears canvas.
     */
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Renders all game objects.
     */
    renderWorld() {
        this.ctx.translate(this.camera_x, 0);

        this.setUpLevel();
        this.setUpCharacterAndEnemies();

        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Handles UI elements.
     */
    handleHUD() {
        this.homeBtn.style.display = 'none';
    }

    /**
     * Checks win/lose conditions.
     */
    checkGameState() {
        if (this.character.isDead()) {
            this.handleDeath();
        }

        if (this.character.finalKill) {
            this.gameWin();
        }
    }

    /**
     * Handles player death.
     */
    handleDeath() {
        if (!this.character.isDying) {
            this.character.startDying();
        }

        const timePassed = Date.now() - this.character.deathStartTime;

        if (timePassed > 1000) {
            this.gameOver();
        }
    }

    /**
     * Game over sequence.
     */
    gameOver() {
        this.character.loadImage(this.character.IMAGES_DEAD[6]);
        this.addToMap(this.endscreen);

        this.gameRestart.style.display = 'flex';
        this.homeBtn.style.display = 'block';

        this.stop();
        this.isPlaying = false;
    }

    /**
     * Win sequence.
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
     * Adds multiple objects to canvas.
     *
     * @param {Array} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => this.addToMap(obj));
    }

    /**
     * Draws a single object with optional flip.
     *
     * @param {Object} mo
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);

        mo.draw(this.ctx);

        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Starts update loop.
     */
    run() {
        this.runIntervall = setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObject();
        }, 1000 / 60);
    }

    /**
     * Handles throwing bottles.
     */
    checkThrowableObject() {
        if (this.keyboard.D && this.character.bottleCount > 0 && !this.lastThrowPressed) {

            const bottle = new ThrowableObject(
                this.character.x + 20,
                this.character.y + 10,
                this.character
            );

            this.throwableObjects.push(bottle);
            this.character.bottleCount--;

            this.level.statusbar[2].setBottleBar(this.character.bottleCount);
        }

        this.lastThrowPressed = this.keyboard.D;
    }

    /**
     * Collision system entry point.
     */
    checkCollisions() {
        if (!this.isPlaying) return;

        this.checkEnemies();
        this.checkCoins();
        this.checkBottle();
    }

    /**
     * Enemy collision handling.
     */
    checkEnemies() {
        this.level.enemies.forEach(enemy => {

            if (enemy.isDying && !enemy.isDead()) {
                this.soundManager.play('chickenDying');
                return;
            }

            if (this.character.jumpOn(enemy)) {
                enemy.energy = 0;
                this.soundManager.play('splat');
                return;
            }

            if (this.character.isColiding(enemy) &&
                !enemy.isDying &&
                !enemy.isDead() &&
                !this.character.isHurt()) {

                this.character.hit(enemy.dmg);
                this.soundManager.play('hit');
                this.level.statusbar[0].setPercentage(this.character.energy);
            }

            this.checkBottleEnemyCollision(enemy);
        });
    }

    /**
     * Bottle vs enemy collision.
     */
    checkBottleEnemyCollision(enemy) {
        this.throwableObjects.forEach(bottle => {
            if (bottle.isColiding(enemy) && !enemy.isDead() && !enemy.isHurt()) {
                bottle.hasSplashed = true;
                bottle.stopGravity();
                enemy.hit(this.character.dmg);
            }
        });
    }

    /**
     * Coin collection.
     */
    checkCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColiding(coin)) {
                coin.collectCoin();
                this.character.coinCount++;

                this.level.statusbar[1].setCoinBar(this.character.coinCount);
                this.soundManager.play('collectSound');
            }
        });
    }

    /**
     * Bottle collection.
     */
    checkBottle() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColiding(bottle)) {
                bottle.collectBottle();
                this.character.bottleCount++;

                this.level.statusbar[2].setBottleBar(this.character.bottleCount);
                this.soundManager.play('collectSound');
            }
        });
    }

    /**
     * Flips image horizontally.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    /**
     * Restores flipped image.
     */
    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }

    /**
     * Level rendering.
     */
    setUpLevel() {
        this.addObjectsToMap(this.level.skyes);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * HUD rendering.
     */
    setUpStatusbars() {
        this.addObjectsToMap(this.level.statusbar);
    }

    /**
     * Character + enemies rendering.
     */
    setUpCharacterAndEnemies() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Stops game loop and cleanup.
     */
    stop() {
        this.running = false;

        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.runIntervall) clearInterval(this.runIntervall);

        this.animationId = null;
        this.runIntervall = null;

        this.soundManager.stopAll();
    }
}