class Bottle extends MoveableObject {
    height = 150;
    width = 150;
    removed = false;

    offset = {
        top: 23,
        left: 60,
        right: 60,
        bottom: 18
    };
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = 100* Math.random() + 100;
    };

    /**
     * The function `collectBottle` sets the `removed` property to true and updates the image, height,
     * and width properties if the bottle in the world level is also removed.
     */
    collectBottle() {
        this.removed = true
        world.level.bottles.forEach(bottle => {
            if (world.character.isColiding(bottle)) {
                bottle.removed = true;
            }
        });
        world.level.bottles = world.level.bottles.filter(obj => !obj.removed);
        
     }

}