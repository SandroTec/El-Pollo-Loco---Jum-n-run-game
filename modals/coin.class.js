class Coin extends MoveableObject {
    height = 150;
    width = 150;

    constructor(x) {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = x;
        this.y = 100* Math.random() + 100;
    }
}