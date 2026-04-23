class Coin extends MoveableObject {
    height = 150;
    width = 150;
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };
    removed = false;
    constructor(x) {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = x;
        this.y = 100* Math.random() + 100;
    };

    /* The `collectCoin()` method in the `Coin` class sets the `removed` property of the current `Coin`
    object to `true`, indicating that the coin has been collected. */
    collectCoin() {
        world.level.coins.forEach(coin => {
            if (world.character.isColiding(coin)) {
                coin.removed = true;
            }
        });
        world.level.coins = world.level.coins.filter(obj => !obj.removed);
    }
    

}