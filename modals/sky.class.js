class Sky extends MoveableObject {
    x;
    y;
    height;
    width;

    constructor(x) {
        super();
        this.x = x;
        this.y = 0;
        this.height = 480;
        this.width = 720;
        this.loadImage('img/5_background/layers/air.png');
    }

}