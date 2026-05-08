/**
 * Represents a game level containing all interactive and visual elements.
 */
class Level {
    /** @type {Array} */
    enemies;

    /** @type {Array} */
    clouds;

    /** @type {Array} */
    backgroundObjects;

    /** @type {Object} */
    endboss;

    /** @type {Array} */
    skyes;

    /** @type {Array} */
    coins;

    /** @type {Array} */
    bottles;

    /** @type {Object} */
    statusbar;

    /** @type {Object} */
    bossBar

    /** @type {Object} */
    endscreen;

    /** @type {boolean} */
    win;

    /**
     * Creates a new Level instance with all required game entities.
     *
     * @param {Array} enemies - List of enemy entities in the level.
     * @param {Array} clouds - Cloud objects for background movement.
     * @param {Array} backgroundObjects - Static background elements.
     * @param {Array} skyes - Sky elements (e.g. layers or parallax backgrounds).
     * @param {Array} coins - Collectible coin objects.
     * @param {Array} bottles - Collectible or throwable bottle objects.
     * @param {Object} statusbar - UI status bar object (e.g. health, coins).
     * @param {boolean} win - Win state flag for the level.
     */
    constructor(enemies, clouds, backgroundObjects, skyes, coins, bottles, statusbar, bossBar, win) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.skyes = skyes;
        this.coins = coins;
        this.bottles = bottles;
        this.statusbar = statusbar;
        this.bossBar = bossBar;
        this.win = win;
    }
}