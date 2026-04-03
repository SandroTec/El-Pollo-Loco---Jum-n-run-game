class Level {
    enemies;
    endboss;
    clouds;
    skyes;
    coins;
    bottle;
    statusbar;
    backgroundObjects;
    level_end_x = 720*2.5;

    constructor(enemies, clouds, backgroundObjects, skyes, coins, bottle, statusbar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.skyes = skyes;
        this.coins = coins;
        this.bottle = bottle;
        this.statusbar = statusbar;
    }
}