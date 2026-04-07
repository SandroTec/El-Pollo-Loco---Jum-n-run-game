class Level {
    startscreen;
    enemies;
    endboss;
    clouds;
    skyes;
    coins;
    bottle;
    statusbar;
    backgroundObjects;
    level_end_x = 720*2.5;
    endscreen;

    constructor(startscreen, enemies, clouds, backgroundObjects, skyes, coins, bottle, statusbar, endscreen) {
        this.startscreen = startscreen;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.skyes = skyes;
        this.coins = coins;
        this.bottle = bottle;
        this.statusbar = statusbar;
        this.endscreen = endscreen;
    }
}