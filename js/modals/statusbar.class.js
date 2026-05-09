
/**
 * Displays the player's health as a status bar.
 * Updates visual representation based on percentage value.
 */
class Statusbar_health extends DrawableObject {

    /** @type {string[]} */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    /**
     * Creates a new health status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.x = 20;
        this.y = 0;
        this.height = 75;
        this.width = 250;
    }

    /**
     * Updates the health bar based on percentage.
     *
     * @param {number} percentage
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        const index = this.getHealthIndex(percentage);
        const path = this.IMAGES_HEALTH[index];

        this.img = this.imageCache[path];
    }

    /**
     * Converts percentage into image index.
     *
     * @param {number} percentage
     * @returns {number}
     */
    getHealthIndex(percentage) {
        if (percentage >= 90) return 5;
        if (percentage >= 70) return 4;
        if (percentage >= 50) return 3;
        if (percentage >= 30) return 2;
        if (percentage >= 15) return 1;
        return 0;
    }
}


/**
 * Displays collected coins as a status bar.
 */
class Statusbar_coin extends DrawableObject {

    /** @type {string[]} */
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    /**
     * Creates a coin status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.setCoinBar(0);
        this.x = 20;
        this.y = 50;
        this.height = 75;
        this.width = 250;
    }

    /**
     * Updates coin bar based on collected coins.
     *
     * @param {number} coinCount
     */
    setCoinBar(coinCount) {
        this.coinCount = coinCount;

        const index = this.clampIndex(coinCount, this.IMAGES_COIN.length);
        const path = this.IMAGES_COIN[index];

        this.img = this.imageCache[path];
    }

    /**
     * Ensures index stays within valid range.
     *
     * @param {number} value
     * @param {number} max
     * @returns {number}
     */
    clampIndex(value, max) {
        return Math.max(0, Math.min(value, max - 1));
    }
}


/**
 * Displays collected bottles as a status bar.
 */
class Statusbar_bottle extends DrawableObject {

    /** @type {string[]} */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /**
     * Creates a bottle status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.setBottleBar(0);
        this.x = 20;
        this.y = 100;
        this.height = 75;
        this.width = 250;
    }

    /**
     * Updates bottle bar based on collected bottles.
     *
     * @param {number} bottle
     */
    setBottleBar(bottle) {
        this.bottle = bottle;

        const index = this.clampIndex(bottle, this.IMAGES_BOTTLE.length);
        const path = this.IMAGES_BOTTLE[index];

        this.img = this.imageCache[path];
    }

    /**
     * Ensures index stays within valid range.
     *
     * @param {number} value
     * @param {number} max
     * @returns {number}
     */
    clampIndex(value, max) {
        return Math.max(0, Math.min(value, max - 1));
    }
}


class Statusbar_boss extends DrawableObject {

    /** @type {string[]} */
    IMAGES_BOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * Creates a status bar for the boss.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS);
        this.setPercentage(100);
        this.x = 410;
        this.y = 10;
        this.height = 75;
        this.width = 250;
    }

    /**
     * Updates the health bar based on percentage.
     *
     * @param {number} percentage
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        const index = this.getHealthIndex(percentage);
        const path = this.IMAGES_BOSS[index];

        this.img = this.imageCache[path];
    }

    /**
     * Converts percentage into image index.
     *
     * @param {number} percentage
     * @returns {number}
     */
    getHealthIndex(percentage) {
        if (percentage >= 90) return 5;
        if (percentage >= 70) return 4;
        if (percentage >= 50) return 3;
        if (percentage >= 30) return 2;
        if (percentage > 0 && percentage <= 29) return 1;
        return 0;
    }
}