class Sky {
    x;
    y;
    height;
    width;

    constructor(x) {
        this.x = x;
        this.y = 0;
        this.height = 480;
        this.width = 720;
        this.loadImage('img/5_background/layers/air.png');
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}