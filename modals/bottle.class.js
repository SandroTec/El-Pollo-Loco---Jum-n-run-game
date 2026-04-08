class Bottle extends MoveableObject {
    height = 150;
    width = 150;

    offset = {
        top: -10,
        left: -20,
        right: -20,
        bottom: -10
    };
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = 100* Math.random() + 100;
    };

    collectBottle() {
        console.log('Salsa-bottle collected!')

    };
}