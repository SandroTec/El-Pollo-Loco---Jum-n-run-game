class Statusbar_health extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.x = 20;
        this.y = 0;
        this.height = 75;
        this.width = 250;
    }

    setPercentage(percentage) {
    this.percentage = percentage;

    let path;

        if (this.percentage >= 90) {
            path = this.IMAGES_HEALTH[5];
        } else if (this.percentage >= 70) {
            path = this.IMAGES_HEALTH[4];
        } else if (this.percentage >= 50) {
            path = this.IMAGES_HEALTH[3];
        } else if (this.percentage >= 30) {
            path = this.IMAGES_HEALTH[2];
        } else if (this.percentage >= 15) {
            path = this.IMAGES_HEALTH[1];
        } else {
            path = this.IMAGES_HEALTH[0];
        }

        this.img = this.imageCache[path]; 
    }
}

class Statusbar_coin extends DrawableObject {
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.setPercentage(100);
        this.x = 20;
        this.y = 40;
        this.height = 75;
        this.width = 250;
    }

    setPercentage(percentage) {
    this.percentage = percentage;

    let path;

        if (this.percentage >= 90) {
            path = this.IMAGES_COIN[0];
        } else if (this.percentage >= 70) {
            path = this.IMAGES_COIN[1];
        } else if (this.percentage >= 50) {
            path = this.IMAGES_COIN[2];
        } else if (this.percentage >= 30) {
            path = this.IMAGES_COIN[3];
        } else if (this.percentage >= 15) {
            path = this.IMAGES_COIN[4];
        } else {
            path = this.IMAGES_COIN[5];
        }

        this.img = this.imageCache[path]; 
    }
}

class Statusbar_bottle extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPercentage(100);
        this.x = 20;
        this.y = 80;
        this.height = 75;
        this.width = 250;
    }

    setPercentage(percentage) {
    this.percentage = percentage;

    let path;

        if (this.percentage >= 90) {
            path = this.IMAGES_BOTTLE[0];
        } else if (this.percentage >= 70) {
            path = this.IMAGES_BOTTLE[1];
        } else if (this.percentage >= 50) {
            path = this.IMAGES_BOTTLE[2];
        } else if (this.percentage >= 30) {
            path = this.IMAGES_BOTTLE[3];
        } else if (this.percentage >= 15) {
            path = this.IMAGES_BOTTLE[4];
        } else {
            path = this.IMAGES_BOTTLE[5];
        }

        this.img = this.imageCache[path]; 
    }
}
