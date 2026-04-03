class Statusbar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    percentage = 100;

    constructor(IMAGES) {
        super();
        this.loadImages(IMAGES);
        this.setPercentage(100);
        this.x = 20;
        this.y = 10;
        this.height = 225;
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

