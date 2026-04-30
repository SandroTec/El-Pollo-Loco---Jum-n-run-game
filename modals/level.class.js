class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    skyes;
    coins;
    bottles;
    statusbar;
    endscreen;
    win;

    constructor(enemies, clouds, backgroundObjects, skyes, coins, bottles, statusbar, win) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.skyes = skyes;
        this.coins = coins;
        this.bottles = bottles;
        this.statusbar = statusbar;
        this.win = win;
    }
}