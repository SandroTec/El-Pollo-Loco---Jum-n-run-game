class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    skyes;
    coins;
    bottle;
    statusbar;
    endscreen;
    win;

    constructor(enemies, clouds, backgroundObjects, skyes, coins, bottle, statusbar, win) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.skyes = skyes;
        this.coins = coins;
        this.bottle = bottle;
        this.statusbar = statusbar;
        this.win = win;
    }
}