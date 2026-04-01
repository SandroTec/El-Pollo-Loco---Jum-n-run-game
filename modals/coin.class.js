class Coin extends MoveableObject {
    height = 350;
    width = 350;

    constructor(x) {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = x;
        this.y = 100* Math.random() + 100;
    }
}