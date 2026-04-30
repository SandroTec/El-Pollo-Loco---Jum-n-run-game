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

    /**
     * The function `setPercentage` sets an image based on a given percentage value.
     * @param percentage - The `setPercentage` function you provided sets an image based on a given
     * percentage value. The function checks the percentage value and assigns an image path accordingly
     * from the `IMAGES_HEALTH` array.
     */
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
        this.setCoinBar(0);
        this.x = 20;
        this.y = 50;
        this.height = 75;
        this.width = 250;
    }

    /* The `setCoinBar(coinCount)` function in the `Statusbar_coin` class is responsible for setting
    the image path for the `img` property based on the `coinCount` parameter provided to the
    function. Here's a breakdown of how it works: */
    setCoinBar(coinCount) {
        this.coinCount = coinCount;
        let path;
        if (this.coinCount == 0) {
            path = this.IMAGES_COIN[0];
        } else if (this.coinCount == 1) {
            path = this.IMAGES_COIN[1];
        } else if (this.coinCount == 2) {
            path = this.IMAGES_COIN[2];
        } else if (this.coinCount == 3) {
            path = this.IMAGES_COIN[3];
        } else if (this.coinCount == 4) {
            path = this.IMAGES_COIN[4];
        } else if (this.coinCount == 5) {
            path = this.IMAGES_COIN[5];
        } else if (this.coinCount == 6) {
            path = this.IMAGES_COIN[6];
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
        this.setBottleBar(0)
        this.x = 20;
        this.y = 100;
        this.height = 75;
        this.width = 250;
    }

    /**
     * The function setBottleBar sets the image path based on the value of the bottle parameter.
     * @param bottle - The `bottle` parameter in the `setBottleBar` function is used to determine which
     * image path to set for the `img` property based on its boolean value. If `bottle` is `false`, the
     * image path is set to `this.IMAGES_BOTTLE[0
     */
    setBottleBar(bottle) {
        this.bottle = bottle;
        let path;
        if (this.bottle == 0) {
            path = this.IMAGES_BOTTLE[0];
        }else if (this.bottle == 1) {
            path = this.IMAGES_BOTTLE[1];
        }else if (this.bottle == 2) {
            path = this.IMAGES_BOTTLE[2];
        }else if (this.bottle == 3) {
            path = this.IMAGES_BOTTLE[3];
        }else if (this.bottle == 4) {
            path = this.IMAGES_BOTTLE[4];
        }else if (this.bottle == 5) {
            path = this.IMAGES_BOTTLE[5];
        }
        else if (this.bottle == 6) {
            path = this.IMAGES_BOTTLE[6];
        }
        this.img = this.imageCache[path]; 
    }
}
