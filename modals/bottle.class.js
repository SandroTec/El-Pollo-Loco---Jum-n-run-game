class Bottle extends MoveableObject {
    height = 150;
    width = 150;
    removed = false;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = 100* Math.random() + 100;
    };

    collectBottle() {
        console.log('Salsa-bottle collected!')    
        this.removed = true
        if (world.level.bottle.removed == true ) {
                this.img.src = '';
                this.height = 0;
                this.width = 0;
        }
     }

}